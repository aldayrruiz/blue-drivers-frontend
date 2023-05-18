import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteVehicleComponent } from '@modules/vehicles/dialogs/delete-vehicle/delete-vehicle.component';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

@NgModule({
  declarations: [DeleteVehicleComponent],
  imports: [CommonModule, MyAngularMaterialModule],
  exports: [DeleteVehicleComponent],
})
export class VehicleDialogsModule {}
