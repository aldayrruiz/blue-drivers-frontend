import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpsPositionsComponent } from './gps-positions.component';

const routes: Routes = [
  {
    path: '',
    component: GpsPositionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpsPositionsRoutingModule {}
