import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// My components
import { LoginFormComponent } from './login-form/login-form.component';
import { CreateUserComponent } from './users/create/create-user.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MyAngularMaterialModule } from '../shared/angular-material.module';
import { CreateVehicleTypeComponent } from './vehicle-types/create/create-vehicle-type.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersTableModule } from './users/table/users-table.module';
import { VehicleTypesTableModule } from './vehicle-types/table/vehicle-types-table.module';
import { EditVehicleTypeComponent } from './vehicle-types/edit/edit-vehicle-type.component';
import { EditAllowedVehicleTypesComponent } from './users/edit-allowed-vehicle/edit-allowed-vehicle-types.component';
import { VehiclesTableModule } from './vehicles/table/vehicles-table.module';
import { CreateVehicleComponent } from './vehicles/create/create-vehicle.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    CreateUserComponent,
    CreateVehicleTypeComponent,
    EditUserComponent,
    EditVehicleTypeComponent,
    EditAllowedVehicleTypesComponent,
    CreateVehicleComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    /* Due to all of these declared components needs Angular Material. I need to import them */
    MyAngularMaterialModule,
  ],
  exports: [
    LoginFormComponent,
    CreateUserComponent,
    CommonModule,
    MyAngularMaterialModule,
    /* Exports ToolbarModule because it need admin routing */
    ToolbarModule,
    UsersTableModule,
    VehicleTypesTableModule,
    VehiclesTableModule,
  ],
})
export class SharedModule {}
