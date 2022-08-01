/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateVehicle, InsuranceCompany, VehicleFuel } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  SnackerService,
  VehicleService,
} from 'src/app/core/services';
import { VehicleIcon, VehicleIconProvider } from 'src/app/core/services/view/vehicle-icon.service';
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
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  insuranceCompanies: InsuranceCompany[] = [];
  matcher = new MyErrorStateMatcher();
  icons: VehicleIcon[];
  iconSelected: VehicleIcon;
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private vehicleIconProvider: VehicleIconProvider,
    private errorMessage: ErrorMessageService,
    private vehicleSrv: VehicleService,
    private fleetRouter: FleetRouter,
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.icons = this.vehicleIconProvider.getIcons();
    this.iconSelected = this.icons[0]; // Pre-select first icon
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
    this.resolveData();
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      brand: ['', brandValidators],
      model: ['', modelValidators],
      numberPlate: ['', numberPlateValidators],
      imei: ['', imeiValidators],
      fuel: [VehicleFuel.DIESEL, fuelValidators],
      insuranceCompany: [],
      policyNumber: ['', policyNumberValidators],
      icon: [this.iconSelected, []], // Pre-select first icon
    });
  }

  createVehicle(): void {
    const vehicle = this.getFormData();

    this.vehicleSrv.create(vehicle).subscribe(
      async () => {
        await this.fleetRouter.goToVehicles();
        const message = 'Vehículo creado con éxito';
        this.snacker.showSuccessful(message);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      }
    );
  }

  private getFormData(): CreateVehicle {
    return {
      brand: this.brand.value,
      model: this.model.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
      fuel: this.fuel.value,
      insurance_company: this.insuranceCompany.value,
      policy_number: this.policyNumber.value,
      icon: this.icon.value.value,
    };
  }

  private resolveData() {
    this.route.data.subscribe((response) => {
      this.insuranceCompanies = response.insuranceCompanies;
    });
  }
}
