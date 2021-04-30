import { Injectable } from '@angular/core';
import { Reservation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MyReservationsTabStorage {
  currentReservation: Reservation;

  constructor() {}

  public setCurrentReservation(data: Reservation): void {
    console.log('Setting reservation');
    console.log(data);
    this.currentReservation = data;
  }

  public getCurrentReservation(): Reservation {
    console.log('Getting reservation');
    console.log(this.currentReservation);
    return this.currentReservation;
  }
}
