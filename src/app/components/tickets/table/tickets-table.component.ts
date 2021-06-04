import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackerService, Ticket, TicketService } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css'],
})
export class TicketsTableComponent implements OnInit {
  tickets: Ticket[];
  dateTimeFormat = PipeDates.dateTimeFormat;

  displayedColumns: string[] = ['title', 'owner', 'dateStored', 'status', 'decide'];

  constructor(
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private ticketSrv: TicketService) {}

  ngOnInit(): void {
    this.resolve();
  }

  private resolve() {
    this.route.data.subscribe((response) => {
      console.log(response['tickets']);
      this.tickets = response['tickets'];
    });
  }
}
