import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// My components
import { LoginFormComponent } from './login-form/login-form.component';
import { CreateUserComponent } from './users/create/create-user.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MyAngularMaterialModule } from '../shared/angular-material.module';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersTableModule } from './users/table/users-table.module';
import { EditAllowedVehiclesComponent } from './users/edit-allowed-vehicles/edit-allowed-vehicles.component';
import { VehiclesTableModule } from './vehicles/table/vehicles-table.module';
import { CreateVehicleComponent } from './vehicles/create/create-vehicle.component';
import { EditVehicleComponent } from './vehicles/edit/edit-vehicle.component';
import { TicketsTableComponent } from './tickets/table/tickets-table.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    CreateUserComponent,
    EditUserComponent,
    EditAllowedVehiclesComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    TicketsTableComponent,
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
    VehiclesTableModule,
  ],
})
export class SharedModule {}
