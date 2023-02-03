import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from 'src/app/core/modules/angular-material.module';
import { DeleteInsuranceCompanyComponent } from './delete-insurance-company/delete-insurance-company.component';
import { DeleteReservationTemplateComponent } from './delete-reservation-template/delete-reservation-template.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
// My components & modules
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { DialogMissingMaintenanceCardsComponent } from './missing-maintenance-cards/missing-maintenance-cards.component';
import { ResendRegistrationEmailComponent } from './resend-email-registration/resend-registration-email.component';

@NgModule({
  declarations: [
    DeleteUserComponent,
    DeleteVehicleComponent,
    DeleteInsuranceCompanyComponent,
    DeleteReservationTemplateComponent,
    ResendRegistrationEmailComponent,
    DialogMissingMaintenanceCardsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    /* Due to all of these declared components needs Angular Material. I need to import them */
    MyAngularMaterialModule,
  ],
  exports: [
    DeleteUserComponent,
    DeleteVehicleComponent,
    DeleteInsuranceCompanyComponent,
    DeleteReservationTemplateComponent,
    ResendRegistrationEmailComponent,
    DialogMissingMaintenanceCardsComponent,
  ],
})
export class DialogModule {}
