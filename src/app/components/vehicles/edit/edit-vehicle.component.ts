import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SnackerService,
  Vehicle,
  EditVehicle,
  VehicleService,
  VehicleType,
} from 'src/app/core';
import { MyErrorStateMatcher } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  types: VehicleType[];
  typeIdSelected: string;
  vehicle: Vehicle;
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup();
  }

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  private setFormGroup() {
    this.formGroup = this.fb.group({
      name: [this.vehicle.name, [Validators.required]],
    });
  }

  matcher = new MyErrorStateMatcher();

  private getUdpatedData(): EditVehicle {
    const updatedData: EditVehicle = {
      name: this.name.value,
      type: this.typeIdSelected,
    };
    return updatedData;
  }

  edit(): void {
    const updatedData = this.getUdpatedData();

    console.log(updatedData);

    this.vehicleSrv.update(this.vehicle.id, updatedData).subscribe(
      async (data: Vehicle) => {
        const message = 'Vehículo editado con exito!';
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      console.log('Response received!', response);
      this.vehicle = response['vehicle'];
      this.types = response['types'];
      this.typeIdSelected = this.vehicle.type.id;
    });
  }
}
