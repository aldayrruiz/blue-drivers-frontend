import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident, incidentTypeLabel } from 'src/app/core/models';
import { IncidentService } from 'src/app/core/services';
import { PipeDates } from 'src/app/core/utils/dates/pipe-dates';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css'],
})
export class IncidentDetailsComponent implements OnInit {
  incident: Incident;
  dateTimeFormat = PipeDates.dateTimeFormat;

  constructor(
    private incidentSrv: IncidentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resolveData();
  }

  resolveData(): void {
    this.route.data.subscribe((data) => {
      this.incident = data.incident;
    });
  }

  solve() {
    this.incidentSrv.solve(this.incident.id).subscribe(
      () => console.log('Solved'),
      () => console.log('Not Solved')
    );
  }

  translateType = incidentTypeLabel;
}
