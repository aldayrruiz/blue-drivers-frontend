import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserService, VehicleType } from 'src/app/core';
import { SnackerService } from 'src/app/shared/services/snacker.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-edit-allowed-vehicle-types',
  templateUrl: './edit-allowed-vehicle-types.component.html',
  styleUrls: ['./edit-allowed-vehicle-types.component.css'],
})
export class EditAllowedVehicleTypesComponent implements OnInit {
  user: User;
  vehicleTypes: VehicleType[];

  displayedColumns: string[] = ['select', 'name'];
  dataSource: MatTableDataSource<VehicleType>;
  selection: SelectionModel<VehicleType>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private snacker: SnackerService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.dataSource = new MatTableDataSource<VehicleType>(this.vehicleTypes);
    const initiallySelectedValues = this.getInitiallySelectedVehicleTypes();
    this.selection = new SelectionModel<VehicleType>(
      true,
      initiallySelectedValues
    );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      console.log('Data response received!', response);
      this.user = response['user'];
      this.vehicleTypes = response['vehicleTypes'];
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
  checkboxLabel(row?: VehicleType): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      this.vehicleTypes.indexOf(row) + 1
    }`;
  }

  save(): void {
    const selectedVehicleTypes = this.selection.selected;
    const vehicleTypeIds = this.mapToIds(selectedVehicleTypes);
    this.userSrv
      .updateAllowedVehicleTypes(this.user.id, vehicleTypeIds)
      .subscribe(
        async () => {
          const message = 'Tipos de vehículos asignados con exito';
          this.snacker.open(message);
        },
        async (errors) => {
          const message =
            'Ha ocurrido un error. Vuelva a intentarlo mas tarde.';
          this.snacker.open(message);
        }
      );
  }

  private mapToIds(vehicleTypes: VehicleType[]): string[] {
    return vehicleTypes.map((vehicleType) => vehicleType.id);
  }

  private getInitiallySelectedVehicleTypes(): VehicleType[] {
    const userAllowedTypesIds = this.mapToIds(this.user.allowed_types);
    // Objects from table are not equal to objects this.user.allowed_types, even if values are equals (JS reference)
    // So, return values from this.vehicleTypes.
    return this.vehicleTypes.filter((vType) =>
      userAllowedTypesIds.includes(vType.id)
    );
  }
}
