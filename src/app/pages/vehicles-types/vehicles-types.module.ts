import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesTypesRoutingModule } from './vehicles-types-routing.module';
import { VehiclesTypesComponent } from './vehicles-types.component';


@NgModule({
  declarations: [
    VehiclesTypesComponent
  ],
  imports: [
    CommonModule,
    VehiclesTypesRoutingModule
  ]
})
export class VehiclesTypesModule { }
