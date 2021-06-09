import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../../models';
import { TicketService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class TicketsResolver implements Resolve<Ticket[]> {
  constructor(private ticketSrv: TicketService) {}

  resolve(): Observable<Ticket[]> {
    return this.ticketSrv.getAll();
  }
}
