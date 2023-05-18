import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesPageRoutingModule } from '@modules/vehicles/pages/vehicles/vehicles-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { CreateVehicleComponent } from './create/create-vehicle.component';
import { EditVehicleComponent } from './edit/edit-vehicle.component';
import { VehiclesTableComponent } from './table/vehicles-table.component';

@NgModule({
  declarations: [VehiclesTableComponent, EditVehicleComponent, CreateVehicleComponent],
  imports: [
    CommonModule,
    VehiclesPageRoutingModule /* This component is using vehicles routing /admin/vehicles */,
    MyAngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [VehiclesTableComponent, EditVehicleComponent, CreateVehicleComponent],
})
export class VehiclesComponentsModule {}
