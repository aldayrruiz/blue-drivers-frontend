import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, VehicleType } from 'src/app/core';
import { SnackerService } from '../../../services/snacker.service';

@Component({
  selector: 'app-vehicle-types-table',
  templateUrl: './vehicle-types-table.component.html',
  styleUrls: ['./vehicle-types-table.component.css'],
})
export class VehicleTypesTableComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];

  constructor(private route: ActivatedRoute, private snacker: SnackerService) {}

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

  deleteVehicleType(): void {
    // DELETE AND MAKE ASYNC
  }
}
