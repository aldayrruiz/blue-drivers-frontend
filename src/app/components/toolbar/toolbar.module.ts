import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { AdminRoutingModule } from '../../pages/admin/admin-routing.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule /* This toolbar is using admin routing /admin/ */,
    MyAngularMaterialModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
