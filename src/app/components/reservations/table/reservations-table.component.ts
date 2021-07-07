import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationService } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css'],
})
export class ReservationsTableComponent implements OnInit {
  reservations: Reservation[];
  dateTimeFormat = PipeDates.dateTimeFormat;

  displayedColumns: string[] = ['title', 'owner', 'dateStored', 'hourMin', 'statistics'];

  constructor(private reservationSrv: ReservationService) {}

  ngOnInit(): void {
    this.reservationSrv.getAll().subscribe((reservations) => {
      this.reservations = reservations.reverse();
    });
  }

  getTimeReserved(reservation: Reservation): string {
    const start = new Date(reservation.start);
    const end = new Date(reservation.end);
    const milliseconds = (end.getTime() - start.getTime()); // milliseconds
    const hours = Math.floor((milliseconds % 86400000) / 3600000); // hours
    const minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000); // minutes
    return `${hours}h ${minutes}m`;
  }
}
