import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'positions',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'positions',
        loadChildren: () => import('@modules/map/pages/gps-positions/gps-positions.module').then((m) => m.GpsPositionsPageModule),
      },
      {
        path: 'reservations',
        loadChildren: () => import('@modules/reservations/pages/reservations/reservations.module').then((m) => m.ReservationsPageModule),
      },

      {
        path: 'incidents',
        loadChildren: () => import('@modules/incidents/pages/incidents/incidents.module').then((m) => m.IncidentsPageModule),
      },
      {
        path: 'tickets',
        loadChildren: () => import('@modules/tickets/pages/tickets/tickets.module').then((m) => m.TicketsPageModule),
      },
      {
        path: 'users',
        loadChildren: () => import('@modules/users/pages/users/users.module').then((m) => m.UsersPageModule),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('@modules/vehicles/pages/vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
      },
      {
        path: 'maintenance',
        loadChildren: () => import('@modules/maintenance/pages/maintenance/maintenance.module').then((m) => m.MaintenancePageModule),
      },
      {
        path: 'insurance-companies',
        loadChildren: () =>
          import('@modules/insurance-companies/pages/insurance-companies/insurance-companies.module').then(
            (m) => m.InsuranceCompaniesPageModule
          ),
      },
      {
        path: 'reservation-templates',
        loadChildren: () =>
          import('@modules/reservation-templates/pages/reservation-templates/reservation-templates.module').then(
            (m) => m.ReservationTemplatesPageModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () => import('@modules/reports/pages/reports/reports.module').then((m) => m.ReportsPageModule),
      },
      {
        path: 'tenants',
        loadChildren: () => import('@modules/tenants/pages/tenants/tenants.module').then((m) => m.TenantsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
