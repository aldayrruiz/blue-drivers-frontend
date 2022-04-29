/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { EditPatchVehicle, fuelLabel, Vehicle } from 'src/app/core/models';
import {
  ErrorMessageService,
  SnackerService,
  VehicleIcon,
  VehicleIconProvider,
  VehicleService,
} from 'src/app/core/services';
import { DeleteVehicleComponent } from '../../dialogs/delete-vehicle/delete-vehicle.component';

interface VehicleRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  isDisabled: boolean;
  insuranceCompany: string;
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
    'numberPlate',
    'insuranceCompany',
    'edit',
    'isDisabled',
    'delete',
  ];

  constructor(
    private readonly vehicleIconProvider: VehicleIconProvider,
    private readonly errorMessage: ErrorMessageService,
    private readonly vehicleSrv: VehicleService,
    private readonly snacker: SnackerService,
    private readonly dialog: MatDialog
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
      insuranceCompany: vehicle?.insurance_company?.name,
      numberPlate: vehicle.number_plate,
      isDisabled: vehicle.is_disabled,
      icon: this.getIconFromVehicle(vehicle),
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
