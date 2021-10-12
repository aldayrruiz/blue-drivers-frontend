import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketsRoutingModule } from 'src/app/pages/tickets/tickets-routing.module';
import { MyAngularMaterialModule } from '../../shared/angular-material.module';
import { SolveTicketComponent } from './solve/solve-ticket.component';
import { TicketsTableComponent } from './table/tickets-table.component';

@NgModule({
  declarations: [TicketsTableComponent, SolveTicketComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule /* This component is using tickets routing /admin/tickets */,
    MyAngularMaterialModule,
  ],
  exports: [TicketsTableComponent, SolveTicketComponent],
})
export class TicketsComponentsModule {}
