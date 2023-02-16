import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { ReservationsRoutingModule } from 'src/app/pages/reservations/reservations-routing.module';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { FieldComponent } from '../filters/user-filter/field.component';
import { AntMapComponent } from './ant-map/ant-map.component';
import { ReservationsFilterComponent } from './filter/reservations-filter.component';
import { ReservationsStatisticsComponent } from './statistics/reservations-statistics.component';
import { ReservationsTableComponent } from './table/reservations-table.component';

@NgModule({
  declarations: [
    ReservationsTableComponent,
    ReservationsStatisticsComponent,
    AntMapComponent,
    ReservationsFilterComponent,
    FieldComponent,
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule /* This component is using reservations routing /admin/reservations */,
    MyAngularMaterialModule,
    CustomPipesModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReservationsTableComponent,
    ReservationsStatisticsComponent,
    ReservationsFilterComponent,
    FieldComponent,
  ],
})
export class ReservationsComponentsModule {}
