import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { UsersRoutingModule } from 'src/app/pages/users/users-routing.module';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { CreateUserComponent } from './create/create-user.component';
import { EditAllowedVehiclesComponent } from './edit-allowed-vehicles/edit-allowed-vehicles.component';
import { EditUserComponent } from './edit/edit-user.component';
import { UsersTableComponent } from './table/users-table.component';

@NgModule({
  declarations: [
    UsersTableComponent,
    CreateUserComponent,
    EditAllowedVehiclesComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule /* This component is using users routing /admin/users */,
    MyAngularMaterialModule,
    ReactiveFormsModule,
    CustomPipesModule,
  ],
  exports: [
    UsersTableComponent,
    CreateUserComponent,
    EditAllowedVehiclesComponent,
    EditUserComponent,
  ],
})
export class UsersComponentsModule {}
