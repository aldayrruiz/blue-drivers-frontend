import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cleaning, getOperationTypeLabel, MaintenanceOperationType, User, Vehicle, Wheels, WheelsOperation } from '@core/models';
import { getMaintenanceOperationStatusLabel, OperationMaintenanceStatus } from '@core/models/maintenance/status.model';
import { ErrorMessageService, MaintenanceService, SnackerService } from '@core/services';
import { DialogMissingMaintenanceCardsComponent } from '@modules/maintenance/dialogs/missing-maintenance-cards/missing-maintenance-cards.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { addDays, addMonths, addYears, formatDuration, intervalToDuration } from 'date-fns';
import { es } from 'date-fns/locale';
import * as moment from 'moment';
import { finalize, forkJoin } from 'rxjs';

interface GenericMaintenanceOperation {
  id: string;
  vehicle: Vehicle;
  owner: User;
  date: string;
  date_stored: string;
  type: MaintenanceOperationType;
  next_revision: string;
  duration: string;
  status: string;
}

interface MaintenanceOperationRow {
  id: string;
  date: string;
  date_stored: string;
  type: string;
}

@Component({
  selector: 'app-maintenance-table',
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.css'],
})
export class MaintenanceTableComponent extends BaseTableComponent<GenericMaintenanceOperation, MaintenanceOperationRow> {
  optionSelected = 'PYC';
  options = [
    { display: 'Pendientes y caducados', value: 'PYC' },
    { display: 'Completados', value: 'C' },
  ];
  getStatusLabel = getMaintenanceOperationStatusLabel;
  columns = ['vehicle', 'operation', 'nextRevision'];

  constructor(
    private errorMessage: ErrorMessageService,
    private maintenanceService: MaintenanceService,
    private snacker: SnackerService,
    private dialog: MatDialog
  ) {
    super();
  }

  preprocessData(operations: GenericMaintenanceOperation[]): MaintenanceOperationRow[] {
    return operations.map((operation) => ({
      id: operation.id,
      model: operation.vehicle.model,
      brand: operation.vehicle.brand,
      numberPlate: operation.vehicle.number_plate,
      date: operation.date,
      date_stored: operation.date_stored,
      type: getOperationTypeLabel(operation.type),
      next_revision: operation.next_revision,
      duration: operation.duration,
      status: operation.status,
    }));
  }

  onSelectionChanged() {
    if (this.optionSelected === 'PYC') {
      const data = this.models.filter(
        (model) => model.status === OperationMaintenanceStatus.PENDING || model.status === OperationMaintenanceStatus.EXPIRED
      );
      this.updateTable(data);
    } else {
      const data = this.models.filter((model) => model.status === OperationMaintenanceStatus.COMPLETED);
      this.updateTable(data);
    }
  }

  fetchDataAndUpdate() {
    const cleaningsObs = this.maintenanceService.getCleanings();
    const itvsObs = this.maintenanceService.getItvs();
    const odometersObs = this.maintenanceService.getOdometers();
    const revisionsObs = this.maintenanceService.getRevisions();
    const wheelsObs = this.maintenanceService.getWheels();
    const obs = forkJoin([cleaningsObs, itvsObs, odometersObs, revisionsObs, wheelsObs]);
    obs.pipe(finalize(() => this.hideLoadingSpinner())).subscribe({
      next: (data) => {
        const cleanings = this.excludeAndSerializeCleanings(data[0]);
        const itvs = this.excludeAndSerialize(data[1], MaintenanceOperationType.Itv);
        const odometers = this.excludeAndSerialize(data[2], MaintenanceOperationType.Odometer);
        const revisions = this.excludeAndSerialize(data[3], MaintenanceOperationType.Revision);
        const wheels = this.excludeAndSerializeWheels(data[4]);
        const operations = [...cleanings, ...itvs, ...odometers, ...revisions, ...wheels];
        const sortedOperations = this.sortOperations(operations);
        this.initTable(sortedOperations);
        this.onSelectionChanged();
      },
      error: () => {},
    });
  }

  private excludeAndSerialize(operations: any[], type: MaintenanceOperationType) {
    return this.excludeNewOperations(operations).map((operation) => this.addDuration(operation, type));
  }

  private excludeAndSerializeCleanings(cleanings: Cleaning[]) {
    return this.excludeNewOperations(cleanings).map((cleaning) => {
      if (!cleaning.vehicle?.cleaning_card) {
        this.dialog.open(DialogMissingMaintenanceCardsComponent, {
          data: { vehicle: cleaning.vehicle },
        });
      }
      const cleaningCard = cleaning.vehicle.cleaning_card;
      const date_period = moment.duration(cleaningCard.date_period);
      const days = date_period.days();
      const months = date_period.months();
      const years = date_period.years();
      const dateStored = cleaning.date_stored;
      let nextRevision = addDays(new Date(dateStored), days);
      nextRevision = addMonths(nextRevision, months);
      nextRevision = addYears(nextRevision, years);
      const next_revision = nextRevision.toJSON();
      const duration = this.readableDuration(nextRevision);
      const type = MaintenanceOperationType.Cleaning;
      return { ...cleaning, type, next_revision, duration };
    });
  }

  private excludeAndSerializeWheels(data: any[]) {
    const type = MaintenanceOperationType.Wheels;
    const operations = this.excludeNewOperations(data);
    const operationsSerialized = operations.map((operation) => this.addDuration(operation, type));
    return operationsSerialized.filter(
      (wheels: Wheels) =>
        wheels.operation === WheelsOperation.Substitution || (wheels.operation === WheelsOperation.Inspection && wheels.passed === false)
    );
  }

  private excludeNewOperations(operations: any[]) {
    return operations.filter(
      (operation) =>
        operation.status === OperationMaintenanceStatus.PENDING ||
        operation.status === OperationMaintenanceStatus.EXPIRED ||
        operation.status === OperationMaintenanceStatus.COMPLETED
    );
  }

  private addDuration(operation: any, type: MaintenanceOperationType) {
    const newRevision = new Date(operation.next_revision);
    const duration = this.readableDuration(newRevision);
    return { ...operation, type, duration };
  }

  private readableDuration(nextRevision: Date) {
    const now = new Date();
    const duration =
      now < nextRevision ? intervalToDuration({ start: now, end: nextRevision }) : intervalToDuration({ start: nextRevision, end: now });
    const result = formatDuration(duration, { format: ['years', 'months', 'days'], locale: es });
    if (!result) {
      return '0 días';
    }
    return result;
  }

  private sortOperations(operations: any[]) {
    // Sort operations from more expired to less and then pending from less to more.
    return operations.sort((o1, o2) => {
      const dateA: any = new Date(o1?.next_revision);
      const dateB = new Date(o2?.next_revision);
      if (dateB < new Date() && dateA >= new Date()) {
        return 1;
      }
      if (dateB >= new Date() && dateA < new Date()) {
        return -1;
      }
      if (dateB < new Date() && dateA < new Date()) {
        return dateA.getTime() - dateB.getTime();
      }
      return dateB.getTime() - dateA.getTime();
    });
  }
}
