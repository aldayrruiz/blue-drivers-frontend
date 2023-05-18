import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteReservationTemplateComponent } from '@modules/reservation-templates/dialogs/delete-reservation-template/delete-reservation-template.component';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

@NgModule({
  declarations: [DeleteReservationTemplateComponent],
  imports: [CommonModule, MyAngularMaterialModule],
  exports: [DeleteReservationTemplateComponent],
})
export class ReservationTemplateDialogsModule {}
