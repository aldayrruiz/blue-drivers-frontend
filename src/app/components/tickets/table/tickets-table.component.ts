import { Component } from '@angular/core';
import { isFuture } from 'date-fns';
import { finalize } from 'rxjs/operators';
import { Ticket, TicketService, TicketStatus } from 'src/app/core';
import { formatDateTime } from 'src/app/shared/utils/dates/custom-fns';
import { BaseTableComponent } from '../../base-table/base-table.component';

interface TicketRow {
  id: string;
  title: string;
  owner: string;
  dateStored: string;
  status: TicketStatus;
}

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css'],
})
export class TicketsTableComponent extends BaseTableComponent<
  Ticket,
  TicketRow
> {
  columns = ['title', 'owner', 'dateStored', 'status', 'decide'];

  constructor(private ticketSrv: TicketService) {
    super();
  }

  updateTable(models: Ticket[]): void {
    const futureTickets = this.removePastTickets(models);
    super.updateTable(futureTickets);
  }

  preprocessData(data: Ticket[]): TicketRow[] {
    return data.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      owner: ticket.owner.fullname,
      dateStored: formatDateTime(ticket.date_stored),
      status: ticket.status,
    }));
  }

  fetchDataAndUpdate(): void {
    this.ticketSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((tickets) => this.updateTable(tickets));
  }

  private removePastTickets(tickets: Ticket[]): Ticket[] {
    return tickets.filter((ticket) => {
      const reservation = ticket.reservation;
      const start = new Date(reservation.start);
      return isFuture(start);
    });
  }
}
