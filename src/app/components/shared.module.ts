import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from '../shared/angular-material.module';
import { DialogModule } from './dialogs/dialogs.module';
import { VehiclesComponent } from './gps-positions/vehicles/vehicles.component';
import { IncidentsComponentsModule } from './incidents/incidents-components.module';
// My components & modules
import { LoginFormComponent } from './login-form/login-form.component';
import { ReservationsComponentsModule } from './reservations/reservations.table.module';
import { TicketsComponentsModule } from './tickets/tickets.table.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { UsersComponentsModule } from './users/users-components.module';
import { VehiclesComponentsModule } from './vehicles/vehicles-components.module';

@NgModule({
  declarations: [LoginFormComponent, VehiclesComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    /* Due to all of these declared components needs Angular Material. I need to import them */
    MyAngularMaterialModule,
    DialogModule,
  ],
  exports: [
    LoginFormComponent,
    CommonModule,
    MyAngularMaterialModule,
    /* Exports ToolbarModule because it need admin routing */
    ToolbarModule,
    UsersComponentsModule,
    VehiclesComponentsModule,
    TicketsComponentsModule,
    ReservationsComponentsModule,
    IncidentsComponentsModule,
  ],
})
export class SharedModule {}
