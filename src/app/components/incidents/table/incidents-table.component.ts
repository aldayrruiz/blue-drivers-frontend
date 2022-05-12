import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Incident, incidentTypeLabel } from 'src/app/core/models';
import { IncidentService } from 'src/app/core/services';
import { BaseTableComponent } from '../../base-table/base-table.component';

interface RowIncident {
  id: string;
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
export class IncidentsTableComponent extends BaseTableComponent<Incident, RowIncident> {
  showOptionSelected = '';
  showOptions = [
    { display: 'Todos', value: '' },
    { display: 'No solucionados', value: 'No Solucionado' },
    { display: 'Solucionados', value: 'Solucionado' },
  ];

  columns = ['owner', 'vehicle', 'numberPlate', 'type', 'status', 'description', 'dateStored', 'details'];

  constructor(private incidentSrv: IncidentService) {
    super();
  }

  onShowSelectionChanged() {
    if (this.showOptionSelected === '') {
      this.updateTable(this.models);
      return;
    }
    const solved = this.showOptionSelected === 'Solucionado' ? true : false;
    const incidents = this.filterIncidents(solved);
    this.updateTable(incidents);
  }

  preprocessData(data: Incident[]): RowIncident[] {
    return data.map((incident) => ({
      id: incident.id,
      owner: incident.owner.fullname,
      vehicle: `${incident.reservation.vehicle.brand} ${incident.reservation.vehicle.model}`,
      numberPlate: incident.reservation.vehicle.number_plate,
      type: incidentTypeLabel(incident.type),
      description: incident.description,
      dateStored: incident.date_stored,
      status: incident.solved ? 'Solucionado' : 'No Solucionado',
    }));
  }

  fetchDataAndUpdate(): void {
    this.incidentSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((incidents) => this.initTable(incidents));
  }

  filterIncidents(solved: boolean) {
    const incidents = this.models.filter((model) => model.solved === solved);
    return incidents;
  }
}
