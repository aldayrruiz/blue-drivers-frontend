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
        loadChildren: () =>
          import('../gps-positions/gps-positions.module').then((m) => m.GpsPositionsPageModule),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('../reservations/reservations.module').then((m) => m.ReservationsPageModule),
      },

      {
        path: 'incidents',
        loadChildren: () =>
          import('../incidents/incidents.module').then((m) => m.IncidentsPageModule),
      },
      {
        path: 'tickets',
        loadChildren: () => import('../tickets/tickets.module').then((m) => m.TicketsPageModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then((m) => m.UsersPageModule),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('../vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
      },
      {
        path: 'insurance-companies',
        loadChildren: () =>
          import('../insurance-companies/insurance-companies.module').then(
            (m) => m.InsuranceCompaniesPageModule
          ),
      },
      {
        path: 'reservation-templates',
        loadChildren: () =>
          import('../reservation-templates/reservation-templates.module').then(
            (m) => m.ReservationTemplatesPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
