import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GNSSComponentsModule } from '@modules/map/components/gnss.module';
import { GpsPositionsRoutingModule } from './gps-positions-routing.module';
import { GpsPositionsComponent } from './gps-positions.component';

@NgModule({
  declarations: [GpsPositionsComponent],
  imports: [CommonModule, GpsPositionsRoutingModule, GNSSComponentsModule],
})
export class GpsPositionsPageModule {}
