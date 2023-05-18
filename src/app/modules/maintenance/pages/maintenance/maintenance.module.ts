import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaintenanceComponentsModule } from '@modules/maintenance/components/maintenance-components.module';
import { MaintenanceDialogsModule } from '@modules/maintenance/dialogs/maintenance-dialogs.module';
import { MaintenanceRoutingModule } from './maintenance-router.module';
import { MaintenanceComponent } from './maintenance.component';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [CommonModule, MaintenanceRoutingModule, MaintenanceComponentsModule, MaintenanceDialogsModule],
})
export class MaintenancePageModule {}
