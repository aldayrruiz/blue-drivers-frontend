import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from '../core/modules/angular-material.module';
import { DialogModule } from './dialogs/dialogs.module';
import { GNSSComponentsModule } from './gps-positions/gnss.module';
import { IncidentsComponentsModule } from './incidents/incidents-components.module';
import { InsuranceCompaniesComponentsModule } from './insurance-companies/insurance-companies.module';
// My components & modules
import { LoginFormComponent } from './login-form/login-form.component';
import { MaintenanceComponentsModule } from './maintenance/maintenance-components.module';
import { ReportsComponentsModule } from './reports/reports-components.module';
import { ReservationTemplatesComponentsModule } from './reservation-templates/reservation-templates.module';
import { ReservationsComponentsModule } from './reservations/reservations.table.module';
import { TenantsComponentsModule } from './tenants/tenants-components.module';
import { TicketsComponentsModule } from './tickets/tickets.table.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { UsersComponentsModule } from './users/users-components.module';
import { VehiclesComponentsModule } from './vehicles/vehicles-components.module';

@NgModule({
  declarations: [LoginFormComponent],
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
    InsuranceCompaniesComponentsModule,
    GNSSComponentsModule,
    ReservationTemplatesComponentsModule,
    ReportsComponentsModule,
    TenantsComponentsModule,
    MaintenanceComponentsModule,
  ],
})
export class SharedModule {}
