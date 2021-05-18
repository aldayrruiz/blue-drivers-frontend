import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditVehicleTypeComponent } from 'src/app/shared/components/vehicle-types/edit-vehicle-type/edit-vehicle-type.component';
import { VehicleTypeResolver } from 'src/app/shared/components/vehicle-types/edit-vehicle-type/vehicle-type.resolver';
import { VehicleTypesTableComponent } from 'src/app/shared/components/vehicle-types/vehicle-types-table/vehicle-types-table.component';
import { VehicleTypesResolver } from 'src/app/shared/components/vehicle-types/vehicle-types-table/vehicle-types.resolver';
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
      }
      ,
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
