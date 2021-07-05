import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident, translateType } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {

  incident: Incident;
  dateTimeFormat = PipeDates.dateTimeFormat;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resolveData();
  }

  resolveData(): void {
    this.route.data.subscribe(data => {
      this.incident = data.incident;
    })
  }

  translateType = translateType;
}
