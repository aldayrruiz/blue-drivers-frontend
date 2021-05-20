import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../../shared/angular-material.module';
import { VehicleTypesTableComponent } from './vehicle-types-table.component';
import { VehicleTypesRoutingModule } from 'src/app/pages/vehicle-types/vehicle-types-routing.module';


@NgModule({
  declarations: [
    VehicleTypesTableComponent
  ],
  imports: [
    CommonModule,
    VehicleTypesRoutingModule, /* This component is using vehicle types routing /admin/vehicle-types */
    MyAngularMaterialModule,
  ],
  exports: [VehicleTypesTableComponent]
})
export class VehicleTypesTableModule { }
