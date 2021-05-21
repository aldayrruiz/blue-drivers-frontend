import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../../models';
import { TicketService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class TicketResolver implements Resolve<Ticket> {
  constructor(private ticketSrv: TicketService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Ticket> {
    const ticketId = route.params['ticketId'];
    return this.ticketSrv.getTicket(ticketId);
  }
}
