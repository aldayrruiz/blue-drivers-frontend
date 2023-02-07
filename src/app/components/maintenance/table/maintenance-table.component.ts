import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addDays, addMonths, addYears, formatDuration, intervalToDuration } from 'date-fns';
import { es } from 'date-fns/locale';
import * as moment from 'moment';
import { finalize, forkJoin } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import {
  Cleaning,
  getOperationTypeLabel,
  MaintenanceOperationType,
  User,
  Vehicle,
  Wheels,
  WheelsOperation,
} from 'src/app/core/models';
import {
  getMaintenanceOperationStatusLabel,
  OperationMaintenanceStatus,
} from 'src/app/core/models/maintenance/status.model';
import { ErrorMessageService, MaintenanceService, SnackerService } from 'src/app/core/services';
import { DialogMissingMaintenanceCardsComponent } from '../../dialogs/missing-maintenance-cards/missing-maintenance-cards.component';

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
export class MaintenanceTableComponent extends BaseTableComponent<
  GenericMaintenanceOperation,
  MaintenanceOperationRow
> {
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

  fetchDataAndUpdate() {
    const cleaningsObs = this.maintenanceService.getCleanings();
    const itvsObs = this.maintenanceService.getItvs();
    const odometersObs = this.maintenanceService.getOdometers();
    const revisionsObs = this.maintenanceService.getRevisions();
    const wheelsObs = this.maintenanceService.getWheels();
    const obs = forkJoin([cleaningsObs, itvsObs, odometersObs, revisionsObs, wheelsObs]);
    obs.pipe(finalize(() => this.hideLoadingSpinner())).subscribe({
      next: (data) => {
        const cleanings = this.serializeCleaning(data[0], MaintenanceOperationType.Cleaning);
        const itvs = this.serialize(data[1], MaintenanceOperationType.Itv);
        const odometers = this.serialize(data[2], MaintenanceOperationType.Odometer);
        const revisions = this.serialize(data[3], MaintenanceOperationType.Revision);
        const wheels = this.serializeWheels(data[4]);
        const operations = [...cleanings, ...itvs, ...odometers, ...revisions, ...wheels];
        const sortedOperations = this.sortOperations(operations);
        sortedOperations.forEach((o) => console.log(new Date(o.next_revision)));
        this.initTable(sortedOperations);
      },
      error: () => {},
    });
  }

  private serializeCleaning(cleanings: Cleaning[], type: MaintenanceOperationType) {
    return cleanings
      .filter(
        (cleaning) =>
          cleaning.status === OperationMaintenanceStatus.PENDING ||
          cleaning.status === OperationMaintenanceStatus.EXPIRED
      )
      .map((cleaning) => {
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
        return { ...cleaning, type, next_revision, duration };
      });
  }

  private serializeWheels(data: any[]) {
    const serialized = this.serialize(data, MaintenanceOperationType.Wheels);
    return serialized.filter(
      (wheels: Wheels) =>
        wheels.operation === WheelsOperation.Substitution ||
        (wheels.operation === WheelsOperation.Inspection && wheels.passed === false)
    );
  }

  private serialize(arr: any[], type: MaintenanceOperationType) {
    return arr
      .filter(
        (operation) =>
          operation.status === OperationMaintenanceStatus.PENDING ||
          operation.status === OperationMaintenanceStatus.EXPIRED
      )
      .map((operation) => {
        const newRevision = new Date(operation.next_revision);
        const duration = this.readableDuration(newRevision);
        return { ...operation, type, duration };
      });
  }

  private readableDuration(nextRevision: Date) {
    const now = new Date();
    const duration =
      now < nextRevision
        ? intervalToDuration({ start: now, end: nextRevision })
        : intervalToDuration({ start: nextRevision, end: now });
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
