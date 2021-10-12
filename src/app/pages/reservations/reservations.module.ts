import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

@NgModule({
  declarations: [ReservationsComponent],
  imports: [CommonModule, ReservationsRoutingModule, SharedModule],
})
export class ReservationsPageModule {}
