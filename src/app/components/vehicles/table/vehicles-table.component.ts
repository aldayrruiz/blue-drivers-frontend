import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackerService, Vehicle, VehicleService } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.css'],
})
export class VehiclesTableComponent implements OnInit {
  vehicles: Vehicle[] = [];
  dateTimeFormat = PipeDates.dateTimeFormat;

  displayedColumns: string[] = ['model', 'brand', 'numberPlate', 'edit', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService
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
        this.snacker.open(`El vehículo ${vehicle.brand} ${vehicle.model} ha sido eliminado.`);
      },
      async (error) => {
        // TODO: Si el vehículo tiene reservas, tickets, etc. ¿Qué pasa con estos?
        this.snacker.open('Un error ha ocurrido. Intentelo mas tarde.');
      }
    );
  }

  refreshTable(): void {
    this.route.data.subscribe((response) => {
      console.log('Vehicles response received!', response);
      this.vehicles = response['vehicles'];
    });
  }
}
