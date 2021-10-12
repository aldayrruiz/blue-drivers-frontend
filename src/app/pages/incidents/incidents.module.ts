import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';

@NgModule({
  declarations: [IncidentsComponent],
  imports: [CommonModule, IncidentsRoutingModule, SharedModule],
})
export class IncidentsPageModule {}
