import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAngularMaterialModule } from '../../shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersTableComponent } from './table/users-table.component';
import { CreateUserComponent } from './create/create-user.component';
import { EditAllowedVehiclesComponent } from './edit-allowed-vehicles/edit-allowed-vehicles.component';
import { UsersRoutingModule } from 'src/app/pages/users/users-routing.module';

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
