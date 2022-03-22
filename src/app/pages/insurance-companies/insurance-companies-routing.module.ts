import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInsuranceCompanyComponent } from 'src/app/components/insurance-companies/create/create-insurance-company.component';
import { EditInsuranceCompanyComponent } from 'src/app/components/insurance-companies/edit/edit-insurance-company.component';
import { InsuranceCompaniesTableComponent } from 'src/app/components/insurance-companies/table/insurance-companies-table.component';
import { InsuranceCompanyResolver } from 'src/app/core/resolvers/insurance-companies/insurance-company.resolver';
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
