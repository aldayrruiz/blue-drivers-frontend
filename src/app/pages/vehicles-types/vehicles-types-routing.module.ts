import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesTypesComponent } from './vehicles-types.component';

const routes: Routes = [{ path: '', component: VehiclesTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesTypesRoutingModule { }
