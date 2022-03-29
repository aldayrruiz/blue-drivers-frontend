import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationTemplatesPageRoutingModule } from 'src/app/pages/reservation-templates/reservation-templates-routing.module';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { CreateReservationTemplateComponent } from './create/create-reservation-template.component';
import { EditReservationTemplateComponent } from './edit/edit-reservation-template.component';
import { ReservationTemplatesTableComponent } from './table/reservation-templates-table.component';

@NgModule({
  declarations: [
    ReservationTemplatesTableComponent,
    EditReservationTemplateComponent,
    CreateReservationTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReservationTemplatesPageRoutingModule,
    MyAngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReservationTemplatesTableComponent,
    EditReservationTemplateComponent,
    CreateReservationTemplateComponent,
  ],
})
export class ReservationTemplatesComponentsModule {}
