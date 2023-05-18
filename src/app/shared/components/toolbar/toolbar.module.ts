import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from '@modules/admin/pages/admin/admin-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, AdminRoutingModule /* This toolbar is using admin routing /admin/ */, MyAngularMaterialModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
