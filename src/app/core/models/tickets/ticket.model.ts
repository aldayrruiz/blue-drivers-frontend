import { Reservation, TicketStatus, User, Vehicle } from '..';

export interface Ticket {
  id: string;
  title: string;
  date_stored: string;
  description: string;
  reservation: Reservation;
  owner: User;
  status: TicketStatus;
  reservation_title: string;
  reservation_description: string;
  reservation_owner: User;
  reservation_vehicle: Vehicle;
  reservation_start: string;
  reservation_end: string;
}
