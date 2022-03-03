import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from 'src/app/pages/users/users-routing.module';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { CreateUserComponent } from './create/create-user.component';
import { EditAllowedVehiclesComponent } from './edit-allowed-vehicles/edit-allowed-vehicles.component';
import { UsersTableComponent } from './table/users-table.component';

@NgModule({
  declarations: [
    UsersTableComponent,
    CreateUserComponent,
    EditAllowedVehiclesComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule /* This component is using users routing /admin/users */,
    MyAngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    UsersTableComponent,
    CreateUserComponent,
    EditAllowedVehiclesComponent,
  ],
})
export class UsersComponentsModule {}
