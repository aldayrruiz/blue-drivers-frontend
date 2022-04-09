import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { User, Vehicle } from 'src/app/core/models';
import { ErrorMessageService, SnackerService, UserService } from 'src/app/core/services';

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
  sending = false;

  constructor(
    private readonly errorMessage: ErrorMessageService,
    private readonly snacker: SnackerService,
    private readonly route: ActivatedRoute,
    private readonly userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
    const oldVehiclesAllowed = this.getOldVehiclesAllowed();
    this.selection = new SelectionModel<Vehicle>(true, oldVehiclesAllowed);
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.user = response.user;
      this.vehicles = response.vehicles;
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
    this.sending = true;
    const selectedVehicles = this.selection.selected;
    const vehicleIds = this.mapToIds(selectedVehicles);
    this.userSrv
      .updateAllowedVehicles(this.user.id, vehicleIds)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          const message = 'Vehículos asignados con éxito';
          this.snacker.showSuccessful(message);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  private mapToIds(vehicles: Vehicle[]): string[] {
    return vehicles.map((vehicle) => vehicle.id);
  }

  private getOldVehiclesAllowed(): Vehicle[] {
    const ids = this.mapToIds(this.user.allowed_vehicles);
    // Objects from table are not equal to objects this.user.allowed_vehicles, even if values are equals (JS reference)
    // So, return values from this.vehicles, which are in the same memory position
    return this.vehicles.filter((vehicle) => ids.includes(vehicle.id));
  }
}
