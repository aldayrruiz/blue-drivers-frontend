import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { MaintenanceRoutingModule } from './maintenance-router.module';
import { MaintenanceComponent } from './maintenance.component';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [CommonModule, MaintenanceRoutingModule, SharedModule],
})
export class MaintenancePageModule {}
