import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsStatisticsComponent } from 'src/app/components/reservations/reservations-statistics/reservations-statistics.component';
import { ReservationsTableComponent } from 'src/app/components/reservations/table/reservations-table.component';
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
      },
      {
        path: 'statistics/:reservationId',
        component: ReservationsStatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
