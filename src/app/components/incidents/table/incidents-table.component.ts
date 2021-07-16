import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident, translateType } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-incidents-table',
  templateUrl: './incidents-table.component.html',
  styleUrls: ['./incidents-table.component.css'],
})
export class IncidentsTableComponent implements OnInit {
  incidents: Incident[] = [];
  dateTimeFormat = PipeDates.dateTimeFormat;

  displayedColumns: string[] = [
    'title',
    'owner',
    'vehicle',
    'type',
    'date_stored',
    'details',
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // First: Load table
    this.refreshTable();
  }

  refreshTable(): void {
    this.route.data.subscribe((response) => {
      console.log('Incidents response received!', response);
      this.incidents = response['incidents'];
    });
  }

  translateType = translateType;
}
