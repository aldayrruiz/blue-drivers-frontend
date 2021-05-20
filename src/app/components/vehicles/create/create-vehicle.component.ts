import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateVehicle,
  SnackerService,
  VehicleService,
  VehicleType,
} from 'src/app/core';
import { MyErrorStateMatcher } from '../../login-form/login-form.component';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  types: VehicleType[];
  typeIdSelected: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit(): void {
    this.resolveTypes();
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      name: ['Todo Terreno', [Validators.required]],
    });
  }

  matcher = new MyErrorStateMatcher();

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  private getFormData(): CreateVehicle {
    return {
      name: this.name.value,
      type: this.typeIdSelected,
    };
  }

  createVehicle(): void {
    const newVehicle = this.getFormData();

    console.log(newVehicle);

    this.vehicleSrv.create(newVehicle).subscribe(
      async (data: CreateVehicle) => {
        const message = 'Vehículo creado con éxito';
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    );
  }

  resolveTypes(): void {
    this.route.data.subscribe((response) => {
      console.log('Vehicle Types response received!', response);
      this.types = response['types'];
      // Selected the first element recieved
      // What if none element is received
      this.typeIdSelected = this.types[0].id;
    });
  }
}
