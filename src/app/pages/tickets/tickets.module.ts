import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from 'src/app/components/shared.module';
import { TicketsComponent } from './tickets.component';

@NgModule({
  declarations: [TicketsComponent],
  imports: [CommonModule, TicketsRoutingModule, SharedModule],
})
export class TicketsPageModule {}
