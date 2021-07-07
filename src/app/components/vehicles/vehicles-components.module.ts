import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../shared/angular-material.module';
import { VehiclesTableComponent } from './table/vehicles-table.component';
import { VehiclesPageRoutingModule } from 'src/app/pages/vehicles/vehicles-routing.module';
import { EditVehicleComponent } from './edit/edit-vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateVehicleComponent } from './create/create-vehicle.component';

@NgModule({
  declarations: [
    VehiclesTableComponent,
    EditVehicleComponent,
    CreateVehicleComponent,
  ],
  imports: [
    CommonModule,
    VehiclesPageRoutingModule /* This component is using vehicles routing /admin/vehicles */,
    MyAngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    VehiclesTableComponent,
    EditVehicleComponent,
    CreateVehicleComponent,
  ],
})
export class VehiclesComponentsModule {}
