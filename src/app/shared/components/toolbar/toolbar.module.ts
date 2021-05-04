import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../../../pages/admin/admin-routing.module'
import { ToolbarComponent } from './toolbar.component';
import { MyAngularMaterialModule } from '../../angular-material.module';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, /* This toolbar is using admin routing /admin/ */
    MyAngularMaterialModule,
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
