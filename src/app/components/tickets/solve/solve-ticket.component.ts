import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Ticket, TicketStatus, Vehicle } from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
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
  vehicle: Vehicle;
  dateTimeFormat = PipeDates.dateTimeFormat;
  sending = false;

  constructor(
    private errorMessage: ErrorMessageService,
    private fleetRouter: BlueDriversRouter,
    private ticketSrv: TicketService,
    private snacker: SnackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resolveTicket();
  }

  resolveTicket(): void {
    this.route.data.subscribe((response) => {
      this.ticket = response.ticket;
      this.vehicle = response.ticket.reservation_vehicle;
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
      .subscribe({
        next: async () => {
          const message = 'Conflicto solucionado';
          this.snacker.showSuccessful(message);
          this.fleetRouter.goToTickets();
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        },
      });
  }
}
