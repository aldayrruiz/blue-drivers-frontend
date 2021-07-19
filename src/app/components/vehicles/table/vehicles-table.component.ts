import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SnackerService, Vehicle, VehicleService } from 'src/app/core';
import { EditPatchVehicle } from 'src/app/core/models/edit/edit-patch-vehicle.model';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';
import { DeleteVehicleComponent } from '../../dialogs/delete-vehicle/delete-vehicle.component';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css'],
})
export class VehiclesTableComponent implements OnInit {
  vehicles: Vehicle[] = [];
  dateTimeFormat = PipeDates.dateTimeFormat;

  displayedColumns: string[] = [
    'model',
    'brand',
    'numberPlate',
    'edit',
    'is_disabled',
    'delete',
  ];

  constructor(
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService,
    private errorMessage: ErrorMessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  openDeleteDialog(vehicle: Vehicle): void {
    const deleteVehicleDialog = this.dialog.open(DeleteVehicleComponent);

    deleteVehicleDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteVehicle(vehicle);
      }
    });
  }

  refreshTable(): void {
    this.route.data.subscribe((response) => {
      this.vehicles = response['vehicles'];
    });
  }

  changeDisabled(vehicle: Vehicle): void {
    const newIsDisabledStatus = !vehicle.is_disabled;
    const data: EditPatchVehicle = { is_disabled: newIsDisabledStatus };
    this.vehicleSrv.patch(vehicle.id, data).subscribe(
      async (response) => {
        vehicle.is_disabled = response.is_disabled;
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.openError(message);
      }
    );
  }

  private deleteVehicle(vehicle: Vehicle): void {
    this.vehicleSrv.delete(vehicle.id).subscribe(
      async () => {
        this.vehicles = this.vehicles.filter((v) => v !== vehicle);
        this.snacker.openSuccessful(
          `El vehículo ${vehicle.brand} ${vehicle.model} ha sido eliminado.`
        );
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.openError(message);
      }
    );
  }
}
