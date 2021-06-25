import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsPositionsRoutingModule } from './gps-positions-routing.module';
import { GpsPositionsComponent } from './gps-positions.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [GpsPositionsComponent],
  imports: [CommonModule, GpsPositionsRoutingModule, SharedModule],
})
export class GpsPositionsPageModule {}
