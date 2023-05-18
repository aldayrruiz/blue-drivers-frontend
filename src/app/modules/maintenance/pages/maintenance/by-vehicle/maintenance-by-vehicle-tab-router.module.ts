import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleResolver } from '@core/resolvers';
import { MaintenanceByVehicleTablesComponent } from '@modules/maintenance/components/by-vehicle/container/by-vehicle-tables.component';
import { EditCleaningCardComponent } from '@modules/maintenance/components/edit-card/cleaning/edit-card.component';
import { EditOdometerCardComponent } from '@modules/maintenance/components/edit-card/odometer/edit-card.component';
import { MaintenanceByVehicleTabComponent } from './maintenance-by-vehicle-tab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tables',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MaintenanceByVehicleTabComponent,
    children: [
      {
        path: 'tables/:vehicleId',
        component: MaintenanceByVehicleTablesComponent,
        resolve: {
          vehicle: VehicleResolver,
        },
      },
      {
        path: 'edit/:vehicleId/cleaning',
        component: EditCleaningCardComponent,
        resolve: {
          vehicle: VehicleResolver,
        },
      },
      {
        path: 'edit/:vehicleId/odometer',
        component: EditOdometerCardComponent,
        resolve: {
          vehicle: VehicleResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceByVehicleTabRoutingModule {}
