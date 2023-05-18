import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { VehiclesComponent } from '@modules/map/components/vehicles/vehicles.component';
import { GpsPositionsRoutingModule } from '@modules/map/pages/gps-positions/gps-positions-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

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
