import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketResolver } from '@core/resolvers/tickets/ticket.resolver';
import { SolveTicketComponent } from '@modules/tickets/components/solve/solve-ticket.component';
import { TicketsTableComponent } from '@modules/tickets/components/table/tickets-table.component';
import { TicketsComponent } from './tickets.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TicketsComponent,
    children: [
      {
        path: 'table',
        component: TicketsTableComponent,
      },
      {
        path: 'solve/:ticketId',
        component: SolveTicketComponent,
        resolve: { ticket: TicketResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
