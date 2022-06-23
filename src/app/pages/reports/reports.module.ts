import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
})
export class ReportsPageModule {}
