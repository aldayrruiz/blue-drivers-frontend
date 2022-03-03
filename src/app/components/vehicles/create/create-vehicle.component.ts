import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateVehicle, SnackerService, VehicleService } from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import {
  brandValidators,
  fuelValidators,
  imeiValidators,
  modelValidators,
  numberPlateValidators,
} from 'src/app/core/validators/vehicle';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      brand: ['', brandValidators],
      model: ['', modelValidators],
      numberPlate: ['', numberPlateValidators],
      imei: ['', imeiValidators],
      fuel: ['DIESEL', fuelValidators],
    });
  }

  private getFormData(): CreateVehicle {
    return {
      brand: this.brand.value,
      model: this.model.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
      fuel: this.fuel.value,
    };
  }

  createVehicle(): void {
    const newVehicle = this.getFormData();

    this.vehicleSrv.create(newVehicle).subscribe(
      async () => {
        this.router.navigate(['..'], { relativeTo: this.route });
        const message = 'Vehículo creado con éxito';
        this.snacker.showSuccessful(message);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      }
    );
  }

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

  get fuel(): AbstractControl {
    return this.formGroup.get('fuel');
  }
}
