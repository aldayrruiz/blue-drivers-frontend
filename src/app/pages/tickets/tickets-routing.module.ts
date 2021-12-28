import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolveTicketComponent } from 'src/app/components/tickets/solve/solve-ticket.component';
import { TicketsTableComponent } from 'src/app/components/tickets/table/tickets-table.component';
import { TicketResolver } from 'src/app/core/resolvers/tickets/ticket.resolver';
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
