import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CleaningCard, EditPatchVehicle, fuelLabel, OdometerCard, Vehicle, vehicleTypeLabel } from '@core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  MaintenanceService,
  SnackerService,
  VehicleIconProvider,
  VehicleService,
} from '@core/services';
import { DialogMissingMaintenanceCardsComponent } from '@modules/maintenance/dialogs/missing-maintenance-cards/missing-maintenance-cards.component';
import { DeleteVehicleComponent } from '@modules/vehicles/dialogs/delete-vehicle/delete-vehicle.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { finalize } from 'rxjs/operators';

interface VehicleRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  isDisabled: boolean;
  insuranceCompany: string;
  icon: string;
  cleaningCard: CleaningCard;
  odometerCard: OdometerCard;
}

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css'],
})
export class VehiclesTableComponent extends BaseTableComponent<Vehicle, VehicleRow> {
  odometerCard: OdometerCard;
  columns = ['icon', 'brand', 'model', 'fuel', 'type', 'numberPlate', 'insuranceCompany', 'maintenance', 'edit', 'isDisabled', 'delete'];

  constructor(
    private maintenanceService: MaintenanceService,
    private errorMessage: ErrorMessageService,
    private appRouter: BlueDriversRouter,
    private vehicleIconProvider: VehicleIconProvider,
    private vehicleSrv: VehicleService,
    private snackerService: SnackerService,
    private dialog: MatDialog
  ) {
    super();
    this.resolve();
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
      icon: this.vehicleIconProvider.getFullUrlOrDefaultFromVehicle(vehicle.icon),
      cleaningCard: vehicle.cleaning_card,
      odometerCard: this.odometerCard, // Odometer card is shared by all vehicles.
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
    this.vehicleSrv.patch(vehicle.id, data).subscribe({
      next: async (response) => {
        vehicle.isDisabled = response.is_disabled;
      },
      error: async (error) => {
        const message = this.errorMessage.get(error);
        this.snackerService.showError(message);
      },
    });
  }

  fetchDataAndUpdate() {
    this.vehicleSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((vehicles) => this.initTable(vehicles));
  }

  async goToMaintenanceByVehicle(vehicle: VehicleRow) {
    if (!this.areCardsCompleted(vehicle)) {
      this.dialog.open(DialogMissingMaintenanceCardsComponent, { data: { vehicle } });
    }

    await this.appRouter.goToMaintenanceByVehicle(vehicle.id);
  }

  getBadgeProperties(vehicle: VehicleRow) {
    const badge = { position: 'below', text: '!', size: 'small', color: 'warn' };
    const noBadge = { position: '', text: '', size: '', color: '' };
    const cardsCompleted = this.areCardsCompleted(vehicle);
    return cardsCompleted ? noBadge : badge;
  }

  areCardsCompleted(vehicle: VehicleRow) {
    return vehicle.cleaningCard && vehicle.odometerCard;
  }

  private deleteVehicle(vehicle: VehicleRow) {
    this.vehicleSrv.delete(vehicle.id).subscribe(
      async () => {
        const newVehicles = this.models.filter((v) => v.id !== vehicle.id);
        this.initTable(newVehicles);
        this.snackerService.showSuccessful(`El vehículo ${vehicle.brand} ${vehicle.model} ha sido eliminado.`);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snackerService.showError(message);
      }
    );
  }

  private resolve() {
    this.maintenanceService.getOdometerCard().subscribe((card) => (this.odometerCard = card));
  }
}
