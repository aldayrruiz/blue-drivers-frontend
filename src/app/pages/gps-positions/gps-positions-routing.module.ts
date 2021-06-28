import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from 'src/app/components/gps-positions/vehicles/vehicles.component';
import { VehiclesResolver } from 'src/app/core';
import { PositionsResolver } from 'src/app/core/resolvers/positions/positions.resolver';
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
          vehicles: VehiclesResolver,
          positions: PositionsResolver,
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpsPositionsRoutingModule {}
