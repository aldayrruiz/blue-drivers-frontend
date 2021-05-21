import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditVehicleTypeComponent } from 'src/app/components/vehicle-types/edit/edit-vehicle-type.component';
import { CreateVehicleComponent } from 'src/app/components/vehicles/create/create-vehicle.component';
import { EditVehicleComponent } from 'src/app/components/vehicles/edit/edit-vehicle.component';
import { VehiclesTableComponent } from 'src/app/components/vehicles/table/vehicles-table.component';
import { VehiclesResolver, VehicleTypesResolver } from 'src/app/core';
import { VehicleResolver } from 'src/app/core/resolvers/vehicles/vehicle.resolver';
import { VehiclesPage } from './vehicles.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: VehiclesPage,
    children: [
      {
        path: 'table',
        component: VehiclesTableComponent,
        resolve: { vehicles: VehiclesResolver },
      },
      {
        path: 'create',
        component: CreateVehicleComponent,
        resolve: { types: VehicleTypesResolver },
      },
      {
        path: 'edit/:vehicleId',
        component: EditVehicleComponent,
        resolve: {
          vehicle: VehicleResolver,
          types: VehicleTypesResolver,
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
