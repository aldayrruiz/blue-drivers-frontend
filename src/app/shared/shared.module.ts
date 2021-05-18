import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// My components
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { MyAngularMaterialModule } from './angular-material.module';
import { CreateVehicleTypeComponent } from './components/vehicle-types/create-vehicle-type/create-vehicle-type.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UsersTableModule } from './components/users/users-table/users-table.module';
import { VehicleTypesTableModule } from './components/vehicle-types/vehicle-types-table/vehicle-types-table.module';
import { EditVehicleTypeComponent } from './components/vehicle-types/edit-vehicle-type/edit-vehicle-type.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    CreateUserComponent,
    CreateVehicleTypeComponent,
    EditUserComponent,
    EditVehicleTypeComponent,
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
  ],
})
export class SharedModule {}
