import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateVehicle, SnackerService, VehicleService } from 'src/app/core';
import { MyErrorStateMatcher } from '../../login-form/login-form.component';

const NUMBER_PLATE_LENGTH = 6;

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
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
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      brand: ['Mercedez Benz', [Validators.required]],
      model: ['S', [Validators.required]],
      numberPlate: [
        'QWER21',
        [
          Validators.required,
          Validators.minLength(NUMBER_PLATE_LENGTH),
          Validators.maxLength(NUMBER_PLATE_LENGTH),
        ],
      ],
      imei: ['0123456789AS', [Validators.required]],
    });
  }

  matcher = new MyErrorStateMatcher();

  get brand(): AbstractControl {
    return this.formGroup.get('brand');
  }

  get model(): AbstractControl {
    return this.formGroup.get('model');
  }

  get numberPlate(): AbstractControl {
    return this.formGroup.get('numberPlate');
  }

  get imei(): AbstractControl {
    return this.formGroup.get('imei');
  }

  private getFormData(): CreateVehicle {
    return {
      brand: this.brand.value,
      model: this.model.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
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
}
