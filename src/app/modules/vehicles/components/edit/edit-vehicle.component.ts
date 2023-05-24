import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditVehicle, InsuranceCompany, Vehicle } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, ImageService, SnackerService, VehicleIconProvider, VehicleService } from '@core/services';
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
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { finalize } from 'rxjs/operators';

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
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private errorMessage: ErrorMessageService,
    private vehicleSrv: VehicleService,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: BlueDriversRouter
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

  get isDisabled(): FormControl {
    return this.formGroup.get('isDisabled') as FormControl;
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

  ngOnInit(): void {
    this.resolve();
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
          await this.router.goToVehicles();
          const message = 'Vehículo editado con éxito!';
          this.snackerService.showSuccessful(message);
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
        },
      });
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.vehicle = response.vehicle;
      this.insuranceCompanies = response.insuranceCompanies;
    });
  }

  getFullUrlFromVehicle(vehicle: Vehicle): string {
    return this.imageService.getFullUrl(vehicle.icon) || '';
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
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
      type: this.type.value,
      insurance_company: insuranceCompany,
      policy_number: this.policyNumber.value,
      icon: this.croppedImage,
    };
  }
}
