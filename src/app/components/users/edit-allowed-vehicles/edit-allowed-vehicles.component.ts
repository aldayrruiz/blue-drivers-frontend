import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserService, SnackerService, Vehicle } from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';

@Component({
  selector: 'app-edit-allowed-vehicles',
  templateUrl: './edit-allowed-vehicles.component.html',
  styleUrls: ['./edit-allowed-vehicles.component.css'],
})
export class EditAllowedVehiclesComponent implements OnInit {
  user: User;
  vehicles: Vehicle[];

  displayedColumns: string[] = ['select', 'vehicle'];
  dataSource: MatTableDataSource<Vehicle>;
  selection: SelectionModel<Vehicle>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private snacker: SnackerService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
    const initiallySelectedValues = this.getInitiallySelectedVehicles();
    this.selection = new SelectionModel<Vehicle>(
      true,
      initiallySelectedValues
    );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      console.log('Data response received!', response);
      this.user = response['user'];
      this.vehicles = response['vehicles'];
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Vehicle): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      this.vehicles.indexOf(row) + 1
    }`;
  }

  save(): void {
    const selectedVehicles = this.selection.selected;
    const vehicleIds = this.mapToIds(selectedVehicles);
    this.userSrv
      .updateAllowedVehicles(this.user.id, vehicleIds)
      .subscribe(
        async () => {
          const message = 'Vehículos asignados con exito';
          this.snacker.open(message);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.open(message);
        }
      );
  }

  private mapToIds(vehicles: Vehicle[]): string[] {
    return vehicles.map((vehicle) => vehicle.id);
  }

  private getInitiallySelectedVehicles(): Vehicle[] {
    const userAllowedVehiclesIds = this.mapToIds(this.user.allowed_vehicles);
    // Objects from table are not equal to objects this.user.allowed_vehicles, even if values are equals (JS reference)
    // So, return values from this.vehicles
    return this.vehicles.filter((vehicle) =>
      userAllowedVehiclesIds.includes(vehicle.id)
    );
  }
}
