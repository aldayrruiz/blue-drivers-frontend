import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationTemplatesComponentsModule } from '@modules/reservation-templates/components/reservation-templates.module';
import { ReservationTemplateDialogsModule } from '@modules/reservation-templates/dialogs/reservation-template-dialogs.module';
import { ReservationTemplatesPageRoutingModule } from './reservation-templates-routing.module';
import { ReservationTemplatesComponent } from './reservation-templates.component';

@NgModule({
  declarations: [ReservationTemplatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReservationTemplatesPageRoutingModule,
    ReservationTemplatesComponentsModule,
    ReservationTemplateDialogsModule,
  ],
})
export class ReservationTemplatesPageModule {}
