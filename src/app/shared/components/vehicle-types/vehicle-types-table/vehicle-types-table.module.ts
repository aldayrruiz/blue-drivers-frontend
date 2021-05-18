import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../../angular-material.module';
import { UsersRoutingModule } from 'src/app/pages/users/users-routing.module';
import { VehicleTypesTableComponent } from './vehicle-types-table.component';


@NgModule({
  declarations: [
    VehicleTypesTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule, /* This toolbar is using users routing /admin/users */
    MyAngularMaterialModule,
  ],
  exports: [VehicleTypesTableComponent]
})
export class VehicleTypesTableModule { }
