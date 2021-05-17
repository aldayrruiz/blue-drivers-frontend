import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'src/app/shared/components/create-user/create-user.component';
import { EditUserComponent } from 'src/app/shared/components/edit-user/edit-user.component';
import { UserResolver } from 'src/app/shared/components/edit-user/user.resolver';
import { UsersTableComponent } from 'src/app/shared/components/users-table/users-table.component';
import { UsersResolver } from 'src/app/shared/components/users-table/users.resolver';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'create-user', component: CreateUserComponent },
      {
        path: 'users-table',
        component: UsersTableComponent,
        resolve: { users: UsersResolver },
      },
      {
        path: 'edit-user/:userId',
        component: EditUserComponent,
        resolve: { user: UserResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
