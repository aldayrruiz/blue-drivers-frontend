import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTenantComponent } from '@modules/tenants/components/create/create-tenant.component';
import { TenantsComponent } from './tenants.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TenantsComponent,
    children: [
      {
        path: 'create',
        component: CreateTenantComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantsRoutingModule {}
