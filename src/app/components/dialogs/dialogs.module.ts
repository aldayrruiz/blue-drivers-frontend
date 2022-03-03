import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from 'src/app/core/modules/angular-material.module';
import { DeleteUserComponent } from './delete-user/delete-user.component';
// My components & modules
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';

@NgModule({
  declarations: [DeleteUserComponent, DeleteVehicleComponent],
  imports: [
    FormsModule,
    CommonModule,
    /* Due to all of these declared components needs Angular Material. I need to import them */
    MyAngularMaterialModule,
  ],
  exports: [DeleteUserComponent, DeleteVehicleComponent],
})
export class DialogModule {}
