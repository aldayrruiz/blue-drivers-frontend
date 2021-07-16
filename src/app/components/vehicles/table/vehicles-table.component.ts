import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackerService, Vehicle, VehicleService } from 'src/app/core';
import { EditPatchVehicle } from 'src/app/core/models/edit/edit-patch-vehicle.model';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

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
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  async deleteVehicle(vehicle: Vehicle): Promise<void> {
    console.log('deleting: ', vehicle);

    // TODO: Preguntar: ¿Está seguro...?

    this.vehicleSrv.delete(vehicle.id).subscribe(
      async () => {
        this.vehicles = this.vehicles.filter((v) => v !== vehicle);
        this.snacker.open(
          `El vehículo ${vehicle.brand} ${vehicle.model} ha sido eliminado.`
        );
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.open(message);
      }
    );
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
        this.snacker.open(message);
      }
    );
  }
}
