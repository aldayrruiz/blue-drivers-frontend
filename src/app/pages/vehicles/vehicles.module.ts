import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiclesPage } from './vehicles.page';

import { VehiclesPageRoutingModule } from './vehicles-routing.module';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, VehiclesPageRoutingModule, SharedModule],
  declarations: [VehiclesPage],
})
export class VehiclesPageModule {}
