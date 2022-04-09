import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EditVehicle, InsuranceCompany, Vehicle } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  SnackerService,
  VehicleService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import {
  brandValidators,
  fuelValidators,
  imeiValidators,
  modelValidators,
  numberPlateValidators,
  policyNumberValidators,
} from 'src/app/core/validators/vehicle';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  insuranceCompanies: InsuranceCompany[] = [];
  matcher = new MyErrorStateMatcher();
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
      insuranceCompany: [vehicle?.insurance_company?.id, []],
      policyNumber: [vehicle.policy_number, policyNumberValidators],
    });
  }

  private getUpdatedData(): EditVehicle {
    const insuranceCompany = this.insuranceCompany.value || null;
    return {
      model: this.model.value,
      brand: this.brand.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
      is_disabled: this.isDisabled.value,
      fuel: this.fuel.value,
      insurance_company: insuranceCompany,
      policy_number: this.policyNumber.value,
    };
  }

  async edit() {
    const vehicle = this.getUpdatedData();
    this.sending = true;
    this.vehicleSrv
      .update(this.vehicle.id, vehicle)
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
      this.vehicle = response.vehicle;
      this.insuranceCompanies = response.insuranceCompanies;
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

  get insuranceCompany(): AbstractControl {
    return this.formGroup.get('insuranceCompany');
  }

  get policyNumber(): AbstractControl {
    return this.formGroup.get('policyNumber');
  }
}
