import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { GpsPositionsRoutingModule } from './gps-positions-routing.module';
import { GpsPositionsComponent } from './gps-positions.component';

@NgModule({
  declarations: [GpsPositionsComponent],
  imports: [CommonModule, GpsPositionsRoutingModule, SharedModule],
})
export class GpsPositionsPageModule {}
