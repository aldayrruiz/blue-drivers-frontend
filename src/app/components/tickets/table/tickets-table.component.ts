import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css'],
})
export class TicketsTableComponent implements OnInit {
  tickets: Ticket[];
  dateTimeFormat = PipeDates.dateTimeFormat;

  displayedColumns: string[] = [
    'title',
    'owner',
    'dateStored',
    'status',
    'decide',
  ];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.tickets = this.removeTicketsUnsolvable(this.tickets);
  }

  private resolve() {
    this.route.data.subscribe((response) => {
      console.log(response['tickets']);
      this.tickets = response['tickets'];
    });
  }

  private removeTicketsUnsolvable(tickets: Ticket[]): Ticket[] {
    return tickets.filter((ticket) => {
      const reservation = ticket.reservation;
      const reservationStart = new Date(reservation.start);
      const now = new Date();
      return now < reservationStart;
    });
  }
}
