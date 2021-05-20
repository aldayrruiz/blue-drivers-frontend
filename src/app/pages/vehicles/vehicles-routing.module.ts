import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVehicleComponent } from 'src/app/components/vehicles/create/create-vehicle.component';
import { VehiclesTableComponent } from 'src/app/components/vehicles/table/vehicles-table.component';
import { VehiclesResolver } from 'src/app/core';
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
      },
      // {
      //   path: 'edit/:vehicleTypeId',
      //   component: EditVehicleTypeComponent,
      //   resolve: { vehicleType: VehicleTypeResolver },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesPageRoutingModule {}
