import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { SnackerService, Vehicle, VehicleService } from 'src/app/core';
import { EditPatchVehicle } from 'src/app/core/models/edit/edit-patch-vehicle.model';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { DeleteVehicleComponent } from '../../dialogs/delete-vehicle/delete-vehicle.component';

interface VehicleRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  isDisabled: boolean;
}

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css'],
})
export class VehiclesTableComponent extends BaseTableComponent<
  Vehicle,
  VehicleRow
> {
  columns = ['model', 'brand', 'numberPlate', 'edit', 'isDisabled', 'delete'];

  constructor(
    private errorMessage: ErrorMessageService,
    private vehicleSrv: VehicleService,
    private snacker: SnackerService,
    private dialog: MatDialog
  ) {
    super();
  }

  preprocessData(data: Vehicle[]): VehicleRow[] {
    return data.map((vehicle) => ({
      id: vehicle.id,
      model: vehicle.model,
      brand: vehicle.brand,
      numberPlate: vehicle.number_plate,
      isDisabled: vehicle.is_disabled,
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
      .subscribe((vehicles) => this.updateTable(vehicles));
  }

  private deleteVehicle(vehicle: VehicleRow) {
    this.vehicleSrv.delete(vehicle.id).subscribe(
      async () => {
        const newVehicles = this.models.filter((v) => v.id !== vehicle.id);
        this.updateTable(newVehicles);
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
}
