import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { ReportsRoutingModule } from 'src/app/pages/reports/reports-routing.module';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { ReportsTableComponent } from './table/table.component';

@NgModule({
  declarations: [ReportsTableComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MyAngularMaterialModule,
    ReactiveFormsModule,
    CustomPipesModule,
  ],
  exports: [ReportsTableComponent],
})
export class ReportsComponentsModule {}
