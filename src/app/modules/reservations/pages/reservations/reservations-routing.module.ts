import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationResolver, UsersResolver, VehiclesResolver } from '@core/resolvers';
import { ReservationsStatisticsComponent } from '@modules/reservations/components/statistics/reservations-statistics.component';
import { ReservationsTableComponent } from '@modules/reservations/components/table/reservations-table.component';
import { ReservationsComponent } from './reservations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ReservationsComponent,
    children: [
      {
        path: 'table',
        component: ReservationsTableComponent,
        resolve: {
          users: UsersResolver,
          vehicles: VehiclesResolver,
        },
      },
      {
        path: 'statistics/:reservationId',
        component: ReservationsStatisticsComponent,
        resolve: {
          users: UsersResolver,
          reservation: ReservationResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
