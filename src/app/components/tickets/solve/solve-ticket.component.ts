import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import {
  Reservation,
  SnackerService,
  Ticket,
  TicketService,
  TicketStatus,
  Vehicle,
} from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { PipeDates } from 'src/app/shared/utils/dates/pipe-dates';

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
    private router: Router,
    private route: ActivatedRoute,
    private ticketSrv: TicketService,
    private snacker: SnackerService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.resolveTicket();
    this.reservation = this.ticket.reservation;
    this.vehicle = this.reservation.vehicle;
  }

  resolveTicket(): void {
    this.route.data.subscribe((response) => {
      this.ticket = response['ticket'];
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
          const message = 'Ticket solucionado';
          this.snacker.openSuccessful(message);
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.openError(message);
        }
      );
  }
}
