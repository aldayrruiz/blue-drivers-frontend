import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackerService } from 'src/app/core';
import { Position } from 'src/app/core/models/position.model';
import { ReportSummary } from 'src/app/core/models/report.summary.model';
import { ReportService } from 'src/app/core/services/api/report.service';
import { AntMapComponent } from '../../ant-map/ant-map.component';

@Component({
  selector: 'app-reservations-statistics',
  templateUrl: './reservations-statistics.component.html',
  styleUrls: ['./reservations-statistics.component.css'],
})
export class ReservationsStatisticsComponent implements OnInit {
  summary: ReportSummary;
  positions: Position[] = [];
  @ViewChild(AntMapComponent)
  private antMap: AntMapComponent;

  constructor(
    private readonly reportSrv: ReportService,
    private readonly snacker: SnackerService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.route.params.subscribe((params) => {
      const reservationId = params.reservationId;
      this.fetchReportSummary(reservationId);
      this.fetchPositions(reservationId);
    });
  }

  private fetchReportSummary(reservationId: string) {
    this.reportSrv.getReservationSummary(reservationId).subscribe(
      (summary) => (this.summary = summary),
      () => this.snacker.showError('No hay un resumen para esta reserva.')
    );
  }

  private fetchPositions(reservationId: string) {
    this.reportSrv.getReservationPositions(reservationId).subscribe(
      (positions) => this.antMap.addAntPath(positions),
      () => this.snacker.showError('No se recibieron posiciones')
    );
  }
}
