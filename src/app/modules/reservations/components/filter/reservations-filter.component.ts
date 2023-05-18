import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserRole, Vehicle } from '@core/models';
import { FieldComponent, ObjectField } from '@shared/components/user-filter/field.component';
import { set } from 'date-fns';

export interface ReservationFilterData {
  userId: string;
  vehicleId: string;
}

@Component({
  selector: 'app-reservations-filter',
  templateUrl: './reservations-filter.component.html',
  styleUrls: ['./reservations-filter.component.css'],
})
export class ReservationsFilterComponent {
  @ViewChild('userField') userField: FieldComponent;
  @ViewChild('vehicleField') vehicleField: FieldComponent;
  @Output() searchEvent = new EventEmitter<ReservationFilterData>();

  users: User[];
  userObjectFields: ObjectField[];

  vehicles: Vehicle[];
  vehicleObjectFields: ObjectField[];

  datePicker = new FormControl();

  constructor(private route: ActivatedRoute) {
    this.resolve();
  }

  get from(): Date {
    const start = this.datePicker.value;
    return start;
  }

  get to(): Date {
    const end = this.datePicker.value;
    if (!end) {
      return null;
    }
    const endOfTheDay = this.getEndOfTheDay(end);
    return endOfTheDay;
  }

  search() {
    this.searchEvent.emit(this.getData());
  }

  getData() {
    return {
      userId: this.userField.getValue().id,
      vehicleId: this.vehicleField.getValue().id,
      from: this.from?.toJSON(),
      to: this.to?.toJSON(),
    };
  }

  resolve() {
    this.route.data.subscribe((data) => {
      this.initUserObjectFields(data.users);
      this.initVehicleObjectFields(data.vehicles);
    });
  }

  private initUserObjectFields(users: User[]) {
    this.users = this.removeSuperAdmin(users);
    this.userObjectFields = this.users.map((user) => ({ id: user.id, value: user.fullname }));
    this.userObjectFields = this.sortAlphabetically(this.userObjectFields);
  }

  private removeSuperAdmin(users: User[]) {
    return users.filter((user) => user.role !== UserRole.SUPER_ADMIN);
  }

  private initVehicleObjectFields(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
    this.vehicleObjectFields = this.vehicles.map((vehicle) => ({
      id: vehicle.id,
      value: `${vehicle.brand} ${vehicle.model} - ${vehicle.number_plate}`,
    }));
    this.vehicleObjectFields = this.sortAlphabetically(this.vehicleObjectFields);
  }

  private sortAlphabetically(objectFields: ObjectField[]) {
    return objectFields.sort((a, b) => a.value.localeCompare(b.value));
  }

  private getEndOfTheDay(day: Date) {
    const options = { hours: 23, minutes: 59, seconds: 59, milliseconds: 59 };
    const endOfTheDay = set(day, options);
    return endOfTheDay;
  }
}
