import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportsComponentsModule } from '@modules/reports/components/reports-components.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, ReportsComponentsModule],
})
export class ReportsPageModule {}
