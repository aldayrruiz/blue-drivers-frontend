export enum TicketStatus {
  UNSOLVED = 'UNSOLVED',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
}

export const ticketStatusLabel = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.UNSOLVED:
      return 'Pendiente';
    case TicketStatus.ACCEPTED:
      return 'Aceptado';
    case TicketStatus.DENIED:
      return 'Rechazado';
  }
};
