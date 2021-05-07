import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateVehicleType } from 'src/app/core';
import { VehicleTypeService } from 'src/app/core/services/vehicle-type.service';
import { SnackerService } from '../../services/snacker.service';
import { MyErrorStateMatcher } from '../../utils/my-error-state-matcher'

@Component({
  selector: 'app-create-vehicle-type',
  templateUrl: './create-vehicle-type.component.html',
  styleUrls: ['./create-vehicle-type.component.css']
})
export class CreateVehicleTypeComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleTypeSrv: VehicleTypeService,
    private snacker: SnackerService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['Turismo', [Validators.required]]
    })
  }

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  private getFormData(): CreateVehicleType {
    const newVehicleType: CreateVehicleType = {
      name: this.name.value
    }
    return newVehicleType;
  }

  createVehicleType(): void {
    const newVehicleType = this.getFormData();
    console.log(newVehicleType);
    this.vehicleTypeSrv.createVehicleType(newVehicleType).subscribe(
      async (data) => {
        const message = 'Tipo de vehículo creado con éxito'
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    );
  }
}
