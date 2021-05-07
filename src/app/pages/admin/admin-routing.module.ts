import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from 'src/app/shared/components/create-user/create-user.component';
import { CreateVehicleTypeComponent } from 'src/app/shared/components/create-vehicle-type/create-vehicle-type.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/create-user',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'create-user', component: CreateUserComponent },
      { path: 'create-vehicle-type', component: CreateVehicleTypeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
