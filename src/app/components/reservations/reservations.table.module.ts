import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReservationsRoutingModule } from 'src/app/pages/reservations/reservations-routing.module';
import { MyAngularMaterialModule } from '../../shared/angular-material.module';
import { ReservationsStatisticsComponent } from './reservations-statistics/reservations-statistics.component';
import { ReservationsTableComponent } from './table/reservations-table.component';

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
