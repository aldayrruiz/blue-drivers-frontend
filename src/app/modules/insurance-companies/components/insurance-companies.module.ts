import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { InsuranceCompaniesPageRoutingModule } from '@modules/insurance-companies/pages/insurance-companies/insurance-companies-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { CreateInsuranceCompanyComponent } from './create/create-insurance-company.component';
import { EditInsuranceCompanyComponent } from './edit/edit-insurance-company.component';
import { InsuranceCompaniesTableComponent } from './table/insurance-companies-table.component';

@NgModule({
  declarations: [InsuranceCompaniesTableComponent, CreateInsuranceCompanyComponent, EditInsuranceCompanyComponent],
  imports: [CommonModule, InsuranceCompaniesPageRoutingModule, MyAngularMaterialModule, CustomPipesModule, ReactiveFormsModule],
  exports: [InsuranceCompaniesTableComponent, CreateInsuranceCompanyComponent, EditInsuranceCompanyComponent],
})
export class InsuranceCompaniesComponentsModule {}
