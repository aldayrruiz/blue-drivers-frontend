import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
