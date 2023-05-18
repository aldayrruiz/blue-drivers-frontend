import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TenantsComponentsModule } from '@modules/tenants/components/tenants-components.module';
import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsComponent } from './tenants.component';

@NgModule({
  declarations: [TenantsComponent],
  imports: [CommonModule, TenantsRoutingModule, TenantsComponentsModule],
})
export class TenantsModule {}
