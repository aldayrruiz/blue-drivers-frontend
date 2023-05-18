import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationTemplateResolver } from '@core/resolvers/reservation-templates/reservation-template.resolver';
import { CreateReservationTemplateComponent } from '@modules/reservation-templates/components/create/create-reservation-template.component';
import { EditReservationTemplateComponent } from '@modules/reservation-templates/components/edit/edit-reservation-template.component';
import { ReservationTemplatesTableComponent } from '@modules/reservation-templates/components/table/reservation-templates-table.component';
import { ReservationTemplatesComponent } from './reservation-templates.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ReservationTemplatesComponent,
    children: [
      {
        path: 'table',
        component: ReservationTemplatesTableComponent,
      },
      {
        path: 'create',
        component: CreateReservationTemplateComponent,
      },
      {
        path: 'edit/:reservationTemplateId',
        component: EditReservationTemplateComponent,
        resolve: {
          reservationTemplate: ReservationTemplateResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationTemplatesPageRoutingModule {}
