import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsComponent } from './tenants.component';

@NgModule({
  declarations: [TenantsComponent],
  imports: [CommonModule, TenantsRoutingModule, SharedModule],
})
export class TenantsModule {}
