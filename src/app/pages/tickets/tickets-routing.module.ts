import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolveTicketComponent } from 'src/app/components/tickets/solve/solve-ticket.component';
import { TicketsTableComponent } from 'src/app/components/tickets/table/tickets-table.component';
import { TicketsResolver } from 'src/app/core/resolvers/tickets/tickets.resolver';
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
        resolve: { tickets: TicketsResolver },
      },
      /* {
        path: 'solve/:ticketId',
        component: SolveTicketComponent, 
      } */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
