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
import { MyErrorStateMatcher } from 'src/app/pages/login/login.component';

const NUMBER_PLATE_LENGTH = 7;

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent implements OnInit {
  vehicle: Vehicle;
  formGroup: FormGroup;
  submitted = false;
  isDisabled = 'abled';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snacker: SnackerService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.vehicle);
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
      imei: [vehicle.number_plate, [Validators.required]],
    });
    this.isDisabled = vehicle.is_disabled === true ? 'abled' : 'disabled';
  }

  matcher = new MyErrorStateMatcher();

  private getUdpatedData(): EditVehicle {

    const isDisabled = this.isDisabled === 'abled' ? true : false;

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
      async (data: Vehicle) => {
        const message = 'Vehículo editado con exito!';
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      console.log('Response received!', response);
      this.vehicle = response['vehicle'];
    });
  }
}
