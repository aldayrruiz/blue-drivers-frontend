import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateVehicle, InsuranceCompany, VehicleFuel, VehicleType } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, SnackerService, VehicleService } from '@core/services';
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
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  insuranceCompanies: InsuranceCompany[] = [];
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private errorMessage: ErrorMessageService,
    private vehicleSrv: VehicleService,
    private fleetRouter: BlueDriversRouter,
    private snackerService: SnackerService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  get brand(): FormControl {
    return this.formGroup.get('brand') as FormControl;
  }

  get model(): FormControl {
    return this.formGroup.get('model') as FormControl;
  }

  get numberPlate(): FormControl {
    return this.formGroup.get('numberPlate') as FormControl;
  }

  get imei(): FormControl {
    return this.formGroup.get('imei') as FormControl;
  }

  get fuel(): FormControl {
    return this.formGroup.get('fuel') as FormControl;
  }

  get type(): FormControl {
    return this.formGroup.get('type') as FormControl;
  }

  get insuranceCompany(): FormControl {
    return this.formGroup.get('insuranceCompany') as FormControl;
  }

  get policyNumber(): FormControl {
    return this.formGroup.get('policyNumber') as FormControl;
  }

  get icon(): FormControl {
    return this.formGroup.get('icon') as FormControl;
  }

  ngOnInit(): void {
    this.resolveData();
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = this.fb.group({
      brand: ['', vehicleBrandValidators],
      model: ['', vehicleModelValidators],
      numberPlate: ['', vehicleNumberPlateValidators],
      imei: ['', vehicleImeiValidators],
      fuel: [VehicleFuel.DIESEL, vehicleFuelValidators],
      type: [VehicleType.TOURISM, vehicleTypeValidators],
      insuranceCompany: [],
      policyNumber: ['', vehiclePolicyNumberValidators],
      icon: [null, []],
    });
  }

  async createVehicle() {
    const vehicle: CreateVehicle = await this.getFormData();

    this.vehicleSrv.create(vehicle).subscribe(
      async () => {
        await this.fleetRouter.goToVehicles();
        const message = 'Vehículo creado con éxito';
        this.snackerService.showSuccessful(message);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snackerService.showError(message);
      }
    );
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  private async getFormData(): Promise<CreateVehicle> {
    return {
      brand: this.brand.value,
      model: this.model.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
      fuel: this.fuel.value,
      type: this.type.value,
      insurance_company: this.insuranceCompany.value,
      policy_number: this.policyNumber.value,
      icon: this.croppedImage,
    };
  }

  private resolveData() {
    this.route.data.subscribe((response) => {
      this.insuranceCompanies = response.insuranceCompanies;
    });
  }
}
