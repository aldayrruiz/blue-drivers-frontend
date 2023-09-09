import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserRole, Vehicle } from '@core/models';
import { FieldComponent, ObjectField } from '@shared/components/user-filter/field.component';
import { endOfDay, set } from 'date-fns';

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
  @Input() texto!: string;

  users: User[];
  userObjectFields: ObjectField[];

  vehicles: Vehicle[];
  vehicleObjectFields: ObjectField[];

  range = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null),
  });

  constructor(private route: ActivatedRoute) {
    this.resolve();
  }

  search() {
    this.searchEvent.emit(this.getData());
  }

  getData() {
    const from = this.range.value.from;
    let to = endOfDay(this.range.value.to);
    // @ts-ignore
    if (isNaN(to)) {
      to = endOfDay(this.range.value.from);
    }

    return {
      userId: this.userField.getValue().id,
      vehicleId: this.vehicleField.getValue().id,
      from: from.toJSON(),
      to: to.toJSON(),
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
