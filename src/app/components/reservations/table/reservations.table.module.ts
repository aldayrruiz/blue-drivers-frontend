import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../../shared/angular-material.module';
import { ReservationsTableComponent } from './reservations-table.component';
import { ReservationsRoutingModule } from 'src/app/pages/reservations/reservations-routing.module';

@NgModule({
  declarations: [ReservationsTableComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule /* This component is using reservations routing /admin/reservations */,
    MyAngularMaterialModule,
  ],
  exports: [ReservationsTableComponent],
})
export class ReservationsTableModule {}
