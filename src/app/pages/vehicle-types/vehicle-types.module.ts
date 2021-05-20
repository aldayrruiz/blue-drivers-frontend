import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleTypesRoutingModule } from './vehicle-types-routing.module';
import { VehicleTypesComponent } from './vehicle-types.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VehicleTypesComponent],
  imports: [CommonModule, VehicleTypesRoutingModule, SharedModule],
})
export class VehicleTypesPageModule {}
