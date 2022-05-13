import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Reservation, Ticket, TicketStatus, Vehicle } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  SnackerService,
  TicketService,
} from 'src/app/core/services';
import { PipeDates } from 'src/app/core/utils/dates/pipe-dates';

@Component({
  selector: 'app-solve-ticket',
  templateUrl: './solve-ticket.component.html',
  styleUrls: ['./solve-ticket.component.css'],
})
export class SolveTicketComponent implements OnInit {
  ticket: Ticket;
  reservation: Reservation;
  vehicle: Vehicle;
  dateTimeFormat = PipeDates.dateTimeFormat;
  sending = false;

  constructor(
    private readonly errorMessage: ErrorMessageService,
    private readonly fleetRouter: FleetRouter,
    private readonly ticketSrv: TicketService,
    private readonly snacker: SnackerService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resolveTicket();
    this.reservation = this.ticket.reservation;
    this.vehicle = this.reservation.vehicle;
  }

  resolveTicket(): void {
    this.route.data.subscribe((response) => {
      this.ticket = response.ticket;
    });
  }

  denyTicket(): void {
    this.solveTicket(TicketStatus.DENIED);
  }

  acceptTicket(): void {
    this.solveTicket(TicketStatus.ACCEPTED);
  }

  private solveTicket(newStatus: TicketStatus): void {
    this.sending = true;
    this.ticketSrv
      .solve(this.ticket.id, newStatus)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          const message = 'Conflicto solucionado';
          this.snacker.showSuccessful(message);
          this.fleetRouter.goToTickets();
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }
}
