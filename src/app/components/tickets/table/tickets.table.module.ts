import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../../shared/angular-material.module';
import { TicketsTableComponent } from './tickets-table.component';
import { TicketsRoutingModule } from 'src/app/pages/tickets/tickets-routing.module';

@NgModule({
  declarations: [TicketsTableComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule /* This component is using tickets routing /admin/tickets */,
    MyAngularMaterialModule,
  ],
  exports: [TicketsTableComponent],
})
export class TicketsTableModule {}
