import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReservationTemplateComponent } from 'src/app/components/reservation-templates/create/create-reservation-template.component';
import { EditReservationTemplateComponent } from 'src/app/components/reservation-templates/edit/edit-reservation-template.component';
import { ReservationTemplatesTableComponent } from 'src/app/components/reservation-templates/table/reservation-templates-table.component';
import { ReservationTemplateResolver } from 'src/app/core/resolvers/reservation-templates/reservation-template.resolver';
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
