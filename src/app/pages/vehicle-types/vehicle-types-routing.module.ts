import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleTypesRoutingModule {}
