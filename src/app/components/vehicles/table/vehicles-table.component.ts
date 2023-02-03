import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import {
  CleaningCard,
  EditPatchVehicle,
  fuelLabel,
  Vehicle,
  vehicleTypeLabel,
} from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  SnackerService,
  VehicleIcon,
  VehicleIconProvider,
  VehicleService,
} from 'src/app/core/services';
import { DeleteVehicleComponent } from '../../dialogs/delete-vehicle/delete-vehicle.component';
import { DialogMissingMaintenanceCardsComponent } from '../../dialogs/missing-maintenance-cards/missing-maintenance-cards.component';

interface VehicleRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  isDisabled: boolean;
  insuranceCompany: string;
  icon: VehicleIcon;
  cleaningCard: CleaningCard;
}

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css'],
})
export class VehiclesTableComponent extends BaseTableComponent<Vehicle, VehicleRow> {
  icons: VehicleIcon[];
  columns = [
    'icon',
    'brand',
    'model',
    'fuel',
    'type',
    'numberPlate',
    'insuranceCompany',
    'maintenance',
    'edit',
    'isDisabled',
    'delete',
  ];

  constructor(
    private vehicleIconProvider: VehicleIconProvider,
    private errorMessage: ErrorMessageService,
    private appRouter: BlueDriversRouter,
    private vehicleSrv: VehicleService,
    private snacker: SnackerService,
    private dialog: MatDialog
  ) {
    super();
    this.icons = this.vehicleIconProvider.getIcons();
  }

  preprocessData(data: Vehicle[]): VehicleRow[] {
    return data.map((vehicle) => ({
      id: vehicle.id,
      model: vehicle.model,
      brand: vehicle.brand,
      fuel: fuelLabel(vehicle.fuel),
      type: vehicleTypeLabel(vehicle.type),
      insuranceCompany: vehicle?.insurance_company?.name,
      numberPlate: vehicle.number_plate,
      isDisabled: vehicle.is_disabled,
      icon: this.getIconFromVehicle(vehicle),
      cleaningCard: vehicle.cleaning_card,
    }));
  }

  openDeleteDialog(vehicle: VehicleRow): void {
    const deleteVehicleDialog = this.dialog.open(DeleteVehicleComponent);

    deleteVehicleDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteVehicle(vehicle);
      }
    });
  }

  changeDisabled(vehicle: VehicleRow) {
    const newIsDisabledStatus = !vehicle.isDisabled;
    const data: EditPatchVehicle = { is_disabled: newIsDisabledStatus };
    this.vehicleSrv.patch(vehicle.id, data).subscribe(
      async (response) => {
        vehicle.isDisabled = response.is_disabled;
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      }
    );
  }

  fetchDataAndUpdate() {
    this.vehicleSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((vehicles) => this.initTable(vehicles));
  }

  goToMaintenanceByVehicle(vehicle: VehicleRow) {
    if (!this.areCardsCompleted(vehicle)) {
      this.dialog.open(DialogMissingMaintenanceCardsComponent, { data: { vehicle } });
    }

    this.appRouter.goToMaintenanceByVehicle(vehicle.id);
  }

  getBadgeProperties(vehicle: VehicleRow) {
    const badge = { position: 'below', text: '!', size: 'small', color: 'warn' };
    const noBadge = { position: '', text: '', size: '', color: '' };
    const cardsCompleted = this.areCardsCompleted(vehicle);
    return cardsCompleted ? noBadge : badge;
  }

  areCardsCompleted(vehicle: VehicleRow) {
    const cardsCompleted = vehicle.cleaningCard;
    return cardsCompleted;
  }

  private deleteVehicle(vehicle: VehicleRow) {
    this.vehicleSrv.delete(vehicle.id).subscribe(
      async () => {
        const newVehicles = this.models.filter((v) => v.id !== vehicle.id);
        this.initTable(newVehicles);
        this.snacker.showSuccessful(
          `El vehículo ${vehicle.brand} ${vehicle.model} ha sido eliminado.`
        );
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      }
    );
  }

  private getIconFromVehicle(vehicle: Vehicle) {
    const icon = this.icons.filter((i) => i.value === vehicle.icon)[0];
    return icon;
  }
}
