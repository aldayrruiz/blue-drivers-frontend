import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehiclesComponentsModule } from '@modules/vehicles/components/vehicles-components.module';
import { VehicleDialogsModule } from '@modules/vehicles/dialogs/vehicle-dialogs.module';
import { VehiclesPageRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';

@NgModule({
  imports: [CommonModule, FormsModule, VehiclesPageRoutingModule, VehiclesComponentsModule, VehicleDialogsModule],
  declarations: [VehiclesComponent],
})
export class VehiclesPageModule {}
