import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportSummary } from 'src/app/core/models/report.summary.model';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-reservations-statistics',
  templateUrl: './reservations-statistics.component.html',
  styleUrls: ['./reservations-statistics.component.css'],
})
export class ReservationsStatisticsComponent implements OnInit {
  summary: ReportSummary;

  constructor(
    private readonly reportSrv: ReportService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchReportSummary();
  }

  async fetchReportSummary() {
    this.route.params.subscribe((params) => {
      const reservationId = params.reservationId;
      this.reportSrv.getReservationSummary(reservationId).subscribe(
        async (summary) => (this.summary = summary),
        async (error) => console.error(error)
      );
    });
  }
}
