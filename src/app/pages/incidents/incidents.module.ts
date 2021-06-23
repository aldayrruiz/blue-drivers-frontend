import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsComponent } from './incidents.component';

import { SharedModule } from 'src/app/components/shared.module';
import { IncidentsRoutingModule } from './incidents-routing.module';

@NgModule({
  declarations: [IncidentsComponent],
  imports: [CommonModule, IncidentsRoutingModule, SharedModule],
})
export class IncidentsPageModule {}
