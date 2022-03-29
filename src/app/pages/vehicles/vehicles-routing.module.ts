import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVehicleComponent } from 'src/app/components/vehicles/create/create-vehicle.component';
import { EditVehicleComponent } from 'src/app/components/vehicles/edit/edit-vehicle.component';
import { VehiclesTableComponent } from 'src/app/components/vehicles/table/vehicles-table.component';
import { InsuranceCompaniesResolver } from 'src/app/core/resolvers/insurance-companies/insurance-companies.resolver';
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
