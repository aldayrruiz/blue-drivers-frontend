import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, CreateTicket } from '../models';
import { ApiPaths } from '../../shared/utils/api-paths.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketURL = `${environment.baseURL}${ApiPaths.Ticket}`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET HTTP request to the server to get a list of tickets.
   */
  getTickets(): Observable<Ticket[]> {
    const path = `${this.ticketURL}/`;
    return this.http.get<Ticket[]>(path);
  }

  /**
   * Sends a GET HTTP request to the server to get a ticket given an identifier.
   * @param id identifier of the ticket to get.
   */
  getTicket(id: string): Observable<Ticket> {
    const path = `${this.ticketURL}/${id}/`;
    return this.http.get<Ticket>(path);
  }

  /**
   * Send a POST HTTP request to the server to store the given ticket data.
   * @param ticket data of the ticket to store.
   */
  createTicket(ticket: CreateTicket): Observable<CreateTicket> {
    const path = `${this.ticketURL}/`;
    return this.http.post<CreateTicket>(path, ticket);
  }
}
