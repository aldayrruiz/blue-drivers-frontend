import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReservationsComponentsModule } from '@modules/reservations/components/reservations.table.module';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

@NgModule({
  declarations: [ReservationsComponent],
  imports: [CommonModule, ReservationsRoutingModule, ReservationsComponentsModule],
})
export class ReservationsPageModule {}
