import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompaniesResolver } from '@core/resolvers/insurance-companies/insurance-companies.resolver';
import { VehicleResolver } from '@core/resolvers/vehicles/vehicle.resolver';
import { CreateVehicleComponent } from '@modules/vehicles/components/create/create-vehicle.component';
import { EditVehicleComponent } from '@modules/vehicles/components/edit/edit-vehicle.component';
import { VehiclesTableComponent } from '@modules/vehicles/components/table/vehicles-table.component';
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
        resolve: {
          insuranceCompanies: InsuranceCompaniesResolver,
        },
      },
      {
        path: 'edit/:vehicleId',
        component: EditVehicleComponent,
        resolve: {
          vehicle: VehicleResolver,
          insuranceCompanies: InsuranceCompaniesResolver,
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
