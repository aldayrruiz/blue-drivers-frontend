import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { TenantsRoutingModule } from '@modules/tenants/pages/tenants/tenants-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { CreateTenantComponent } from './create/create-tenant.component';

@NgModule({
  declarations: [CreateTenantComponent],
  imports: [
    CommonModule,
    TenantsRoutingModule /* This component is using users routing /admin/tenants */,
    MyAngularMaterialModule,
    ReactiveFormsModule,
    CustomPipesModule,
  ],
  exports: [CreateTenantComponent],
})
export class TenantsComponentsModule {}
