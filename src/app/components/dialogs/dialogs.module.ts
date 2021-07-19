import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

// My components & modules
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MyAngularMaterialModule } from 'src/app/shared/angular-material.module';
@NgModule({
  declarations: [
    DeleteUserComponent,
    DeleteVehicleComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    /* Due to all of these declared components needs Angular Material. I need to import them */
    MyAngularMaterialModule,
    
  ],
  exports: [
    DeleteUserComponent,
    DeleteVehicleComponent,
  ],
})
export class DialogModule {}
