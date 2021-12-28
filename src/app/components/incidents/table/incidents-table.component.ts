import { Component } from '@angular/core';
import { format } from 'date-fns';
import { finalize } from 'rxjs/operators';
import { Incident, IncidentService, translateType } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';
import { BaseTableComponent } from '../../base-table/base-table.component';

interface RowIncident {
  id: string;
  title: string;
  owner: string;
  vehicle: string;
  type: string;
  dateStored: string;
}

@Component({
  selector: 'app-incidents-table',
  templateUrl: './incidents-table.component.html',
  styleUrls: ['./incidents-table.component.css'],
})
export class IncidentsTableComponent extends BaseTableComponent<
  Incident,
  RowIncident
> {
  dateTimeFormat = PipeDates.dateTimeFormat;

  columns = ['title', 'owner', 'vehicle', 'type', 'dateStored', 'details'];

  constructor(private incidentSrv: IncidentService) {
    super();
  }

  preprocessData(data: Incident[]): RowIncident[] {
    return data.map((incident) => ({
      id: incident.id,
      title: incident.title,
      owner: incident.owner.fullname,
      vehicle: `${incident.reservation.vehicle.model} ${incident.reservation.vehicle.brand}`,
      type: translateType(incident.type),
      dateStored: format(
        new Date(incident.date_stored),
        PipeDates.dateTimeFormat
      ),
    }));
  }

  fetchDataAndUpdate(): void {
    this.incidentSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((incidents) => this.updateTable(incidents));
  }
}
