import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompanyResolver } from '@core/resolvers/insurance-companies/insurance-company.resolver';
import { CreateInsuranceCompanyComponent } from '@modules/insurance-companies/components/create/create-insurance-company.component';
import { EditInsuranceCompanyComponent } from '@modules/insurance-companies/components/edit/edit-insurance-company.component';
import { InsuranceCompaniesTableComponent } from '@modules/insurance-companies/components/table/insurance-companies-table.component';
import { InsuranceCompaniesComponent } from './insurance-companies.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: InsuranceCompaniesComponent,
    children: [
      {
        path: 'table',
        component: InsuranceCompaniesTableComponent,
      },
      {
        path: 'create',
        component: CreateInsuranceCompanyComponent,
      },
      {
        path: 'edit/:insuranceCompanyId',
        component: EditInsuranceCompanyComponent,
        resolve: {
          vehicle: InsuranceCompanyResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceCompaniesPageRoutingModule {}
