import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'src/app/shared/components/users/create/create-user.component';
import { EditAllowedVehicleTypesComponent } from 'src/app/shared/components/users/edit-allowed-vehicle/edit-allowed-vehicle-types.component';
import { EditUserComponent } from 'src/app/shared/components/users/edit-user/edit-user.component';
import { UserResolver } from 'src/app/shared/components/users/edit-user/user.resolver';
import { UsersTableComponent } from 'src/app/shared/components/users/table/users-table.component';
import { UsersResolver } from 'src/app/shared/components/users/table/users.resolver';
import { VehicleTypesResolver } from 'src/app/shared/components/vehicle-types/table/vehicle-types.resolver';
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
        resolve: { users: UsersResolver },
      },
      { path: 'create', component: CreateUserComponent },
      {
        path: 'edit/:userId',
        component: EditUserComponent,
        resolve: { user: UserResolver },
      },
      {
        path: 'edit/:userId/allowed-vehicle-types',
        component: EditAllowedVehicleTypesComponent,
        // TODO: No es el resolver del usuario común.
        // Es un resolver que contenga los tipos de vehiculos que tiene permitido el usuario.
        // Ademas otro resolver para saber los tipos de vehículos que existen y poder seleccionarlos.
        resolve: { user: UserResolver, vehicleTypes: VehicleTypesResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}