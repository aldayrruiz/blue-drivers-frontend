import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Ticket, TicketStatus, ticketStatusLabel } from 'src/app/core/models';
import { TicketService } from 'src/app/core/services';
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
export class TicketsTableComponent extends BaseTableComponent<Ticket, TicketRow> {
  columns = ['title', 'owner', 'dateStored', 'status', 'decide'];
  ticketStatusLabel = ticketStatusLabel;
  constructor(private ticketSrv: TicketService) {
    super();
  }

  updateTable(models: Ticket[]): void {
    super.updateTable(models);
  }

  preprocessData(data: Ticket[]): TicketRow[] {
    return data.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      owner: ticket.owner.fullname,
      dateStored: ticket.date_stored,
      status: ticket.status,
    }));
  }

  fetchDataAndUpdate(): void {
    this.ticketSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((tickets) => this.initTable(tickets));
  }
}
