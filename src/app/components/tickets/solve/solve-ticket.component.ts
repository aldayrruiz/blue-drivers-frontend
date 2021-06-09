import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation, SnackerService, Ticket, TicketService, TicketStatus, Vehicle } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-solve-ticket',
  templateUrl: './solve-ticket.component.html',
  styleUrls: ['./solve-ticket.component.css']
})
export class SolveTicketComponent implements OnInit {

  ticket: Ticket;
  reservation: Reservation;
  vehicle: Vehicle;
  dateTimeFormat = PipeDates.dateTimeFormat;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketSrv: TicketService,
    private snacker: SnackerService,
  ) { }

  ngOnInit(): void {
    this.resolveTicket();
    this.reservation = this.ticket.reservation;
    this.vehicle = this.reservation.vehicle;
  }

  resolveTicket(): void {
    this.route.data.subscribe((response) => {
      console.log('Ticket reponse received!', response);
      this.ticket = response['ticket'];
    })
  }

  denyTicket(): void {
    this.solveTicket(TicketStatus.DENIED);
  }

  acceptTicket(): void {
    this.solveTicket(TicketStatus.ACCEPTED);
  }

  private solveTicket(newStatus: TicketStatus): void {
    this.ticketSrv.solve(this.ticket.id, newStatus).subscribe(
      async () => {
        const message = 'Ticket solucionado'
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    )
  }
}
