import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { InsuranceCompaniesPageRoutingModule } from './insurance-companies-routing.module';
import { InsuranceCompaniesComponent } from './insurance-companies.component';

@NgModule({
  declarations: [InsuranceCompaniesComponent],
  imports: [
    CommonModule,
    FormsModule,
    InsuranceCompaniesPageRoutingModule,
    SharedModule,
  ],
})
export class InsuranceCompaniesPageModule {}
