import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditVehicleType, VehicleType } from 'src/app/core';
import { VehicleTypeService } from 'src/app/core/services/vehicle-type.service';
import { SnackerService } from 'src/app/shared/services/snacker.service';
import { MyErrorStateMatcher } from 'src/app/shared/utils/my-error-state-matcher';

@Component({
  selector: 'app-edit-vehicle-type',
  templateUrl: './edit-vehicle-type.component.html',
  styleUrls: ['./edit-vehicle-type.component.css'],
})
export class EditVehicleTypeComponent implements OnInit {
  formGroup: FormGroup;
  vehicleType: VehicleType;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleTypeSrv: VehicleTypeService,
    private snacker: SnackerService
  ) {}

  ngOnInit(): void {
    this.resolveVehicleType();
    this.setFormGroup();
  }

  matcher = new MyErrorStateMatcher();

  private getUdpatedData(): EditVehicleType {
    const updatedData: EditVehicleType = {
      name: this.name.value
    };
    return updatedData;
  }

  edit(): void {
    const updatedData = this.getUdpatedData();
    console.log('Sending ', updatedData);

    this.vehicleTypeSrv.update(this.vehicleType.id, updatedData).subscribe(
      async (data: VehicleType) => {
        const message = 'Tipo de vehículo editado con exito!';
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    )
  }

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  private resolveVehicleType(): void {
    this.route.data.subscribe((response) => {
      console.log('Vehicle type to edit received', response);
      this.vehicleType = response['vehicleType'];
    });
  }

  private setFormGroup(): void {
    this.formGroup = this.fb.group({
      name: [this.vehicleType.name, [Validators.required]],
    });
  }
}
