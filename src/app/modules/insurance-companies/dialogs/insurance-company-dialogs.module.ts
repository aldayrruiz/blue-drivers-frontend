import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { DeleteInsuranceCompanyComponent } from './delete-insurance-company/delete-insurance-company.component';

@NgModule({
  declarations: [DeleteInsuranceCompanyComponent],
  imports: [FormsModule, CommonModule, MyAngularMaterialModule],
  exports: [DeleteInsuranceCompanyComponent],
})
export class InsuranceCompanyDialogsModule {}
