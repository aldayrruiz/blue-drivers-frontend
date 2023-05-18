import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionsResolver, UsersResolver, VehiclesResolver } from '@core/resolvers';
import { VehiclesComponent } from '@modules/map/components/vehicles/vehicles.component';
import { GpsPositionsComponent } from './gps-positions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
  {
    path: '',
    component: GpsPositionsComponent,
    children: [
      {
        path: 'vehicles',
        component: VehiclesComponent,
        resolve: {
          users: UsersResolver,
          vehicles: VehiclesResolver,
          positions: PositionsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpsPositionsRoutingModule {}
