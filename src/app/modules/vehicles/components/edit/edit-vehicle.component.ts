import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditVehicle, InsuranceCompany, Vehicle } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, SnackerService, VehicleService } from '@core/services';
import { VehicleIcon, VehicleIconProvider } from '@core/services/view/vehicle-icon.service';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import {
  vehicleBrandValidators,
  vehicleFuelValidators,
  vehicleImeiValidators,
  vehicleModelValidators,
  vehicleNumberPlateValidators,
  vehiclePolicyNumberValidators,
  vehicleTypeValidators,
} from '@core/validators/vehicle';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  insuranceCompanies: InsuranceCompany[] = [];
  matcher = new MyErrorStateMatcher();
  icons: VehicleIcon[];
  iconSelected: VehicleIcon;
  vehicle: Vehicle;
  formGroup: FormGroup;
  sending = false;

  constructor(
    private vehicleIconProvider: VehicleIconProvider,
    private errorMessage: ErrorMessageService,
    private vehicleSrv: VehicleService,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private router: BlueDriversRouter
  ) {
    this.icons = this.vehicleIconProvider.getIcons();
  }

  get brand() {
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

  get type(): AbstractControl {
    return this.formGroup.get('type');
  }

  get insuranceCompany(): AbstractControl {
    return this.formGroup.get('insuranceCompany');
  }

  get policyNumber(): AbstractControl {
    return this.formGroup.get('policyNumber');
  }

  get icon(): AbstractControl {
    return this.formGroup.get('icon');
  }

  ngOnInit(): void {
    this.resolve();
    this.iconSelected = this.getIconFromVehicle(this.vehicle);
    this.setFormGroup(this.vehicle);
  }

  async edit() {
    const vehicle = this.getUpdatedData();
    this.sending = true;
    this.vehicleSrv
      .update(this.vehicle.id, vehicle)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.router.goToVehicles();
          const message = 'Vehículo editado con éxito!';
          this.snacker.showSuccessful(message);
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        },
      });
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.vehicle = response.vehicle;
      this.insuranceCompanies = response.insuranceCompanies;
    });
  }

  private setFormGroup(vehicle: Vehicle) {
    this.formGroup = this.formBuilder.group({
      brand: [vehicle.brand, vehicleBrandValidators],
      model: [vehicle.model, vehicleModelValidators],
      numberPlate: [vehicle.number_plate, vehicleNumberPlateValidators],
      imei: [vehicle.gps_device.imei, vehicleImeiValidators],
      isDisabled: [vehicle.is_disabled],
      fuel: [vehicle.fuel, vehicleFuelValidators],
      type: [vehicle.type, vehicleTypeValidators],
      insuranceCompany: [vehicle?.insurance_company?.id, []],
      policyNumber: [vehicle.policy_number, vehiclePolicyNumberValidators],
      icon: [this.iconSelected, []],
    });
  }

  private getIconFromVehicle(vehicle: Vehicle) {
    const icon = this.icons.filter((i) => i.value === vehicle.icon)[0];
    return icon;
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
      type: this.type.value,
      insurance_company: insuranceCompany,
      policy_number: this.policyNumber.value,
      icon: this.icon.value.value,
    };
  }
}
