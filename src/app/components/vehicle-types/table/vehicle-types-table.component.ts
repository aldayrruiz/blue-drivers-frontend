import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleType, SnackerService, VehicleTypeService } from 'src/app/core';

@Component({
  selector: 'app-vehicle-types-table',
  templateUrl: './vehicle-types-table.component.html',
  styleUrls: ['./vehicle-types-table.component.css'],
})
export class VehicleTypesTableComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];

  constructor(
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleTypeSrv: VehicleTypeService
  ) {}

  displayedColumns: string[] = ['name', 'edit', 'delete'];

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.route.data.subscribe((response) => {
      console.log('Vehicle types response received!', response);
      console.log(response['vehicleTypes']);
      this.vehicleTypes = response['vehicleTypes'];
    });
  }

  delete(vType: VehicleType): void {
    console.log('Deleting', vType);

    // TODO: Preguntar: ¿Está seguro...?

    this.vehicleTypeSrv.deleteVehicleType(vType.id).subscribe(
      async () => {
        this.vehicleTypes = this.vehicleTypes.filter((vT) => vT !== vType);
        this.snacker.open(
          `El tipo de vehículo ${vType.name} ha sido eliminado`
        );
      },
      async (error) => {
        // TODO: Si el tipo de vehículo está asociado a otros vehículos. ¿Qué pasa con estos.
        this.snacker.open(`Un error ha ocurrido. Intentelo mas tarde.`);
      }
    );
  }
}
