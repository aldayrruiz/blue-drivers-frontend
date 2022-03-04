import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVehicleComponent } from 'src/app/components/vehicles/create/create-vehicle.component';
import { EditVehicleComponent } from 'src/app/components/vehicles/edit/edit-vehicle.component';
import { VehiclesTableComponent } from 'src/app/components/vehicles/table/vehicles-table.component';
import { VehicleResolver } from 'src/app/core/resolvers/vehicles/vehicle.resolver';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: 'table',
        component: VehiclesTableComponent,
      },
      {
        path: 'create',
        component: CreateVehicleComponent,
      },
      {
        path: 'edit/:vehicleId',
        component: EditVehicleComponent,
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
export class VehiclesPageRoutingModule {}
