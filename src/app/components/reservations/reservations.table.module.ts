import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReservationsRoutingModule } from 'src/app/pages/reservations/reservations-routing.module';
import { DurationPipe } from 'src/app/shared/duration.pipe';
import { MyAngularMaterialModule } from '../../shared/angular-material.module';
import { AntMapComponent } from '../ant-map/ant-map.component';
import { ReservationsStatisticsComponent } from './statistics/reservations-statistics.component';
import { ReservationsTableComponent } from './table/reservations-table.component';

@NgModule({
  declarations: [
    ReservationsTableComponent,
    ReservationsStatisticsComponent,
    AntMapComponent,
    DurationPipe,
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule /* This component is using reservations routing /admin/reservations */,
    MyAngularMaterialModule,
  ],
  exports: [ReservationsTableComponent, ReservationsStatisticsComponent],
})
export class ReservationsComponentsModule {}
