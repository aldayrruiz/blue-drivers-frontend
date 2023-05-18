import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { ReportsRoutingModule } from '@modules/reports/pages/reports/reports-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { ReportsTableComponent } from './table/table.component';

@NgModule({
  declarations: [ReportsTableComponent],
  imports: [CommonModule, ReportsRoutingModule, MyAngularMaterialModule, ReactiveFormsModule, CustomPipesModule],
  exports: [ReportsTableComponent],
})
export class ReportsComponentsModule {}
