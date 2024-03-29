import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceTableComponent } from '@modules/maintenance/components/table/maintenance-table.component';
import { MaintenanceComponent } from './maintenance.component';
import { VehiclesResolver } from '@core/resolvers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MaintenanceComponent,
    children: [
      {
        path: 'table',
        component: MaintenanceTableComponent,
        resolve: {
          vehicles: VehiclesResolver
        }
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./by-vehicle/maintenance-by-vehicle-tab.module').then((m) => m.MaintenanceByVehicleTabPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
