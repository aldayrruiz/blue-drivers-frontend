import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { ReservationTemplatesPageRoutingModule } from './reservation-templates-routing.module';
import { ReservationTemplatesComponent } from './reservation-templates.component';

@NgModule({
  declarations: [ReservationTemplatesComponent],
  imports: [CommonModule, FormsModule, ReservationTemplatesPageRoutingModule, SharedModule],
})
export class ReservationTemplatesPageModule {}
