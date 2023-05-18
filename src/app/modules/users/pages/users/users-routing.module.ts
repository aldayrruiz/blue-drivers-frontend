import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver, VehiclesResolver } from '@core/resolvers';
import { CreateUserComponent } from '@modules/users/components/create/create-user.component';
import { EditAllowedVehiclesComponent } from '@modules/users/components/edit-allowed-vehicles/edit-allowed-vehicles.component';
import { EditUserComponent } from '@modules/users/components/edit/edit-user.component';
import { UsersTableComponent } from '@modules/users/components/table/users-table.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'table',
        component: UsersTableComponent,
      },
      { path: 'create', component: CreateUserComponent },
      {
        path: 'edit/:userId/allowed-vehicle-types',
        component: EditAllowedVehiclesComponent,
        resolve: { user: UserResolver, vehicles: VehiclesResolver },
      },
      {
        path: 'edit/:userId',
        component: EditUserComponent,
        resolve: {
          user: UserResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
