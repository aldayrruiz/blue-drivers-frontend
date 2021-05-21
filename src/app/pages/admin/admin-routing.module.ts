import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersPageModule),
      },
      {
        path: 'vehicle-types',
        loadChildren: () =>
          import('../vehicle-types/vehicle-types.module').then(
            (m) => m.VehicleTypesPageModule
          ),
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('../vehicles/vehicles.module').then(
            (m) => m.VehiclesPageModule
          ),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('../tickets/tickets.module').then((m) => m.TicketsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
