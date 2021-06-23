import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncidentsTableComponent } from "src/app/components/incidents/table/incidents-table.component";
import { IncidentsComponent } from "./incidents.component";

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
        resolve: { incidents: IncidentsResolver },
      },
      {
        path: 'details/:incidentId',
        component: IncidentDetailsComponent,
        resolve: { incident: IncidentResolver },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsRoutingModule {}
