import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarModule } from '@shared/components/toolbar/toolbar.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, ToolbarModule],
})
export class AdminPageModule {}
