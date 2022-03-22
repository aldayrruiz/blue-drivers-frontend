import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { GpsPositionsRoutingModule } from 'src/app/pages/gps-positions/gps-positions-routing.module';
import { MyAngularMaterialModule } from '../../core/modules/angular-material.module';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
  declarations: [VehiclesComponent],
  imports: [
    CommonModule,
    GpsPositionsRoutingModule /* This component is using reservations routing /admin/reservations */,
    MyAngularMaterialModule,
    CustomPipesModule,
  ],
  exports: [VehiclesComponent],
})
export class GNSSComponentsModule {}
