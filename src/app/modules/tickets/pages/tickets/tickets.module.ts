import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketsComponentsModule } from '@modules/tickets/components/tickets.table.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';

@NgModule({
  declarations: [TicketsComponent],
  imports: [CommonModule, TicketsRoutingModule, TicketsComponentsModule],
})
export class TicketsPageModule {}
