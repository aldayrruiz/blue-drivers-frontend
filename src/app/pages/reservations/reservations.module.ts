import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/components/shared.module';
import { ReservationsComponent } from './reservations.component';
import { ReservationsRoutingModule } from './reservations-routing.module';

@NgModule({
  declarations: [ReservationsComponent],
  imports: [CommonModule, ReservationsRoutingModule, SharedModule],
})
export class ReservationsPageModule {}
