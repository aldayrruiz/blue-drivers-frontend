import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentResolver } from '@core/resolvers/incidents/incident.resolver';
import { IncidentDetailsComponent } from '@modules/incidents/components/details/incident-details.component';
import { IncidentsTableComponent } from '@modules/incidents/components/table/incidents-table.component';
import { IncidentsComponent } from './incidents.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: IncidentsComponent,
    children: [
      {
        path: 'table',
        component: IncidentsTableComponent,
      },
      {
        path: 'table-solved',
        component: IncidentsTableComponent,
      },
      {
        path: 'details/:incidentId',
        component: IncidentDetailsComponent,
        resolve: { incident: IncidentResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsRoutingModule {}
