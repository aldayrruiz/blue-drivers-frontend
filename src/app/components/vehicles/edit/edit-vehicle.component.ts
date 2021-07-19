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
  VehicleService
} from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { MyErrorStateMatcher } from 'src/app/pages/login/login.component';

const NUMBER_PLATE_LENGTH = 7;

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  vehicle: Vehicle;
  formGroup: FormGroup;
  submitted = false;
  isDisabled = 'abled';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.vehicle);
  }

  private setFormGroup(vehicle: Vehicle) {
    this.formGroup = this.fb.group({
      brand: [vehicle.brand, [Validators.required]],
      model: [vehicle.model, [Validators.required]],
      numberPlate: [
        vehicle.number_plate,
        [
          Validators.required,
          Validators.minLength(NUMBER_PLATE_LENGTH),
          Validators.maxLength(NUMBER_PLATE_LENGTH),
        ],
      ],
      imei: [vehicle.gps_device.imei, [Validators.required]],
    });
    this.isDisabled = vehicle.is_disabled === false ? 'abled' : 'disabled';
  }

  private getUdpatedData(): EditVehicle {

    const isDisabled = this.isDisabled === 'abled' ? false : true;

    const updatedData: EditVehicle = {
      model: this.model.value,
      brand: this.brand.value,
      number_plate: this.numberPlate.value,
      gps_device: this.imei.value,
      is_disabled: isDisabled
    };
    return updatedData;
  }

  edit(): void {
    const updatedData = this.getUdpatedData();

    console.log(updatedData);

    this.vehicleSrv.update(this.vehicle.id, updatedData).subscribe(
      async () => {
        this.router.navigate(['../..'], { relativeTo: this.route });
        const message = 'Vehículo editado con exito!';
        this.snacker.openSuccessful(message);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.openError(message);
      }
    );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      console.log('Response received!', response);
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
}
