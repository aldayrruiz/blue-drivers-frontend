import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  fuelLabel,
  Position,
  ReportSummary,
  Reservation,
  Vehicle,
} from 'src/app/core/models';
import {
  FuelPriceCalculatorFactory,
  ReportService,
  ReportSummarySerializer,
  ReservationService,
  TimeReservedService,
} from 'src/app/core/services';
import { AntMapComponent } from '../../ant-map/ant-map.component';

@Component({
  selector: 'app-reservations-statistics',
  templateUrl: './reservations-statistics.component.html',
  styleUrls: ['./reservations-statistics.component.css'],
})
export class ReservationsStatisticsComponent implements OnInit {
  vehicle: Vehicle;
  summary: ReportSummary;
  positions: Position[] = [];
  @ViewChild(AntMapComponent)
  private antMap: AntMapComponent;
  reservation: Reservation;

  priceFuelConsumed = 0;
  fuel: string;
  timeReserved: string;

  constructor(
    private readonly priceFuelCalculatorFactory: FuelPriceCalculatorFactory,
    private readonly reportSerializer: ReportSummarySerializer,
    private readonly timeReservedSrv: TimeReservedService,
    private readonly reservationSrv: ReservationService,
    private readonly reportSrv: ReportService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.route.params.subscribe(async (params) => {
      const reservationId = params.reservationId;
      const response = await this.promisesToFetch(reservationId);
      const [reservation, summary, positions] = response;
      this.serializeSummary(summary);
      this.positions = positions;
      this.reservation = reservation;
      this.loadAntMap();
      this.loadDataForUI();
    });
  }

  private async promisesToFetch(reservationId: string) {
    const reservation = this.fetchReservation(reservationId);
    const reportSummary = this.fetchReportSummary(reservationId);
    const positions = this.fetchPositions(reservationId);
    return Promise.all([reservation, reportSummary, positions]);
  }

  private fetchReservation(reservationId: string) {
    return this.reservationSrv.get(reservationId).toPromise();
  }

  private fetchReportSummary(reservationId: string) {
    return this.reportSrv.getReservationSummary(reservationId).toPromise();
  }

  private fetchPositions(reservationId: string) {
    return this.reportSrv.getReservationPositions(reservationId).toPromise();
  }

  private loadDataForUI() {
    this.vehicle = this.reservation.vehicle;
    this.fuel = fuelLabel(this.vehicle.fuel);
    this.setTimeReserved();
    this.calculatePriceFuelConsumed();
  }

  private serializeSummary(summary: ReportSummary) {
    this.summary = this.reportSerializer.convert(summary);
  }

  private calculatePriceFuelConsumed() {
    const fuel = this.vehicle.fuel;

    const calculator = this.priceFuelCalculatorFactory.getCalculator(fuel);
    const price = calculator.getPrice(this.summary.distance);
    this.priceFuelConsumed = price;
  }

  private setTimeReserved() {
    this.timeReserved = this.timeReservedSrv.getFromReservation(
      this.reservation
    );
  }

  private loadAntMap() {
    this.antMap.addAntPath(this.positions);
  }
}
