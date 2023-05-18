import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuelLabel, Position, ReportSummary, Reservation, User, Vehicle } from '@core/models';
import {
  FuelPriceCalculatorFactory,
  PositionService,
  ReportService,
  ReportSummarySerializer,
  SnackerService,
  TimeReservedService,
} from '@core/services';
import { getIntensitiesByPassenger, getPassengersMedianIsGreaterThanLimit, onlyBeaconPositions } from '@core/utils/occupants/main';
import { AntMapComponent } from '../ant-map/ant-map.component';

@Component({
  selector: 'app-reservations-statistics',
  templateUrl: './reservations-statistics.component.html',
  styleUrls: ['./reservations-statistics.component.css'],
})
export class ReservationsStatisticsComponent implements OnInit {
  @ViewChild(AntMapComponent) antMap: AntMapComponent;
  vehicle: Vehicle;
  users: User[];
  passengers: User[];
  summary: ReportSummary;
  positions: Position[] = [];
  reservation: Reservation;
  priceFuelConsumed = 0;
  fuel: string;
  timeReserved: string;
  validData = false;
  isLoading = true;

  constructor(
    private priceFuelCalculatorFactory: FuelPriceCalculatorFactory,
    private reportSerializer: ReportSummarySerializer,
    private timeReservedSrv: TimeReservedService,
    private positionsSrv: PositionService,
    private reportSrv: ReportService,
    private snacker: SnackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.fetchData();
  }

  fetchData() {
    this.route.params.subscribe(() => {
      this.fetchReportSummary(this.reservation.id);
    });
  }

  private fetchReportSummary(reservationId: string) {
    return this.reportSrv.getReservationSummary(reservationId).subscribe({
      next: (summary) => {
        this.serializeSummary(summary);
        this.loadDataForUI();
        this.fetchPositions(summary.realStartTime, summary.realEndTime);
      },
    });
  }

  private fetchPositions(start: string, end: string) {
    return this.positionsSrv.route([this.vehicle.id], start, end).subscribe({
      next: (positions) => {
        this.positions = positions;
        this.loadAntMap();
        this.loadOccupants();
        this.isLoading = false;
      },
    });
  }

  private loadDataForUI() {
    this.calculatePriceFuelConsumed();
  }

  private serializeSummary(summary: ReportSummary) {
    this.summary = this.reportSerializer.convert(summary);
    console.log(this.summary);
  }

  private calculatePriceFuelConsumed() {
    const fuel = this.vehicle.fuel;

    const calculator = this.priceFuelCalculatorFactory.getCalculator(fuel);
    const price = calculator.getPrice(this.summary.distance);
    this.priceFuelConsumed = price;
  }

  private setTimeReserved() {
    this.timeReserved = this.timeReservedSrv.getFromReservation(this.reservation);
  }

  private loadOccupants() {
    // Filtrar las posiciones que tienen información de beacons
    const positions = this.positions.filter(onlyBeaconPositions);
    const intensitiesByPassenger = getIntensitiesByPassenger(positions, this.users);
    const passengers = getPassengersMedianIsGreaterThanLimit(intensitiesByPassenger, -70);
    this.passengers = passengers;
  }

  private loadAntMap() {
    this.positions = this.removeInvalidPositions(this.positions);
    if (this.positions.length < 0) {
      this.validData = false;
      this.showThereWasNoMovement();
      return;
    }

    const areAllPositionsTheSame = this.areAllPositionsTheSame(this.positions);
    if (areAllPositionsTheSame) {
      this.validData = false;
      this.showThereWasNoMovement();
      return;
    }

    this.validData = true;
    this.antMap.addAntPath(this.positions);
  }

  private removeInvalidPositions(positions: Position[]) {
    return positions.filter((position) => position.valid);
  }

  private areAllPositionsTheSame(positions: Position[]): boolean {
    return positions.every((position) => position.latitude === positions[0].latitude && position.longitude === positions[0].longitude);
  }

  private showThereWasNoMovement() {
    this.snacker.showError('No hubo desplazamiento del vehículo en el tiempo de reserva');
  }

  private resolve(): void {
    this.route.data.subscribe((response) => {
      // Save and load UI reservation data
      this.users = response.users;
      this.reservation = response.reservation;
      this.vehicle = this.reservation.vehicle;
      this.fuel = fuelLabel(this.vehicle.fuel);
      this.setTimeReserved();
    });
  }
}
