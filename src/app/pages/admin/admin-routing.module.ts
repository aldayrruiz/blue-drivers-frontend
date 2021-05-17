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
      { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'vehicle-types', loadChildren: () => import('../vehicles-types/vehicles-types.module').then(m => m.VehiclesTypesModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
