import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../shared/angular-material.module';
import { ReservationsTableComponent } from './table/reservations-table.component';
import { ReservationsRoutingModule } from 'src/app/pages/reservations/reservations-routing.module';
import { ReservationsStatisticsComponent } from './reservations-statistics/reservations-statistics.component';

@NgModule({
  declarations: [ReservationsTableComponent, ReservationsStatisticsComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule /* This component is using reservations routing /admin/reservations */,
    MyAngularMaterialModule,
  ],
  exports: [ReservationsTableComponent, ReservationsStatisticsComponent],
})
export class ReservationsComponentsModule {}
