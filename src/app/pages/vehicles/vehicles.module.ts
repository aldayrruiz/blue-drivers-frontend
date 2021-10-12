import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { VehiclesPageRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';

@NgModule({
  imports: [CommonModule, FormsModule, VehiclesPageRoutingModule, SharedModule],
  declarations: [VehiclesComponent],
})
export class VehiclesPageModule {}
