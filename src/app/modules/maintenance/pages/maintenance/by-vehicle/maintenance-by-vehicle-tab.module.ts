import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaintenanceByVehicleTabRoutingModule } from './maintenance-by-vehicle-tab-router.module';
import { MaintenanceByVehicleTabComponent } from './maintenance-by-vehicle-tab.component';

@NgModule({
  declarations: [MaintenanceByVehicleTabComponent],
  imports: [CommonModule, MaintenanceByVehicleTabRoutingModule],
})
export class MaintenanceByVehicleTabPageModule {}
