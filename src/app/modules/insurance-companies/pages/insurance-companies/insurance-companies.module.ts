import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceCompaniesComponentsModule } from '@modules/insurance-companies/components/insurance-companies.module';
import { InsuranceCompanyDialogsModule } from '@modules/insurance-companies/dialogs/insurance-company-dialogs.module';
import { InsuranceCompaniesPageRoutingModule } from './insurance-companies-routing.module';
import { InsuranceCompaniesComponent } from './insurance-companies.component';

@NgModule({
  declarations: [InsuranceCompaniesComponent],
  imports: [
    CommonModule,
    FormsModule,
    InsuranceCompaniesPageRoutingModule,
    InsuranceCompaniesComponentsModule,
    InsuranceCompanyDialogsModule,
  ],
})
export class InsuranceCompaniesPageModule {}
