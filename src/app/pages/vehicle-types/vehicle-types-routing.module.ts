import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVehicleTypeComponent } from 'src/app/components/vehicle-types/create/create-vehicle-type.component';
import { EditVehicleTypeComponent } from 'src/app/components/vehicle-types/edit/edit-vehicle-type.component';
import { VehicleTypesTableComponent } from 'src/app/components/vehicle-types/table/vehicle-types-table.component';
import { VehicleTypesResolver, VehicleTypeResolver } from 'src/app/core';
import { VehicleTypesComponent } from './vehicle-types.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: VehicleTypesComponent,
    children: [
      {
        path: 'table',
        component: VehicleTypesTableComponent,
        resolve: { vehicleTypes: VehicleTypesResolver },
      },
      {
        path: 'create', component: CreateVehicleTypeComponent
      },
      {
        path: 'edit/:vehicleTypeId',
        component: EditVehicleTypeComponent,
        resolve: { vehicleType: VehicleTypeResolver },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleTypesRoutingModule {}
