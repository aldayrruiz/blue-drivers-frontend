import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EditVehicle, Vehicle } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  SnackerService,
  VehicleService,
} from 'src/app/core/services';
import {
  brandValidators,
  fuelValidators,
  imeiValidators,
  modelValidators,
  numberPlateValidators,
} from 'src/app/core/validators/vehicle';
import { CustomErrorStateMatcher } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  matcher = new CustomErrorStateMatcher();
  vehicle: Vehicle;
  formGroup: FormGroup;
  sending = false;

  constructor(
    private readonly router: FleetRouter,
    private readonly route: ActivatedRoute,
    private readonly snacker: SnackerService,
    private readonly formBuilder: FormBuilder,
    private readonly vehicleSrv: VehicleService,
    private readonly errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.vehicle);
  }

  private setFormGroup(vehicle: Vehicle) {
    this.formGroup = this.formBuilder.group({
      brand: [vehicle.brand, brandValidators],
      model: [vehicle.model, modelValidators],
      numberPlate: [vehicle.number_plate, numberPlateValidators],
      imei: [vehicle.gps_device.imei, imeiValidators],
      isDisabled: [vehicle.is_disabled],
      fuel: [vehicle.fuel, fuelValidators],
    });
  }

  private getUpdatedData(): EditVehicle {
    const updatedData: EditVehicle = {
      model: this.model.value,
      brand: this.brand.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
      is_disabled: this.isDisabled.value,
      fuel: this.fuel.value,
    };
    return updatedData;
  }

  async edit() {
    this.sending = true;
    const updatedData = this.getUpdatedData();

    this.vehicleSrv
      .update(this.vehicle.id, updatedData)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.goToVehicles();
          const message = 'Vehículo editado con éxito!';
          this.snacker.showSuccessful(message);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.vehicle = response['vehicle'];
    });
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

  get isDisabled(): AbstractControl {
    return this.formGroup.get('isDisabled');
  }

  get fuel(): AbstractControl {
    return this.formGroup.get('fuel');
  }
}
