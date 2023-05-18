import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { MaintenanceRoutingModule } from '@modules/maintenance/pages/maintenance/maintenance-router.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { DurationPickerModule } from 'ngx-duration-picker';
import { CleaningsTableComponent } from './by-vehicle/cleanings-table/cleanings-table.component';
import { MaintenanceByVehicleTablesComponent } from './by-vehicle/container/by-vehicle-tables.component';
import { ItvsTableComponent } from './by-vehicle/itvs-table/itvs-table.component';
import { OdometersTableComponent } from './by-vehicle/odometers-table/odometers-table.component';
import { RepairmentsTableComponent } from './by-vehicle/repairments-table/repairments-table.component';
import { RevisionsTableComponent } from './by-vehicle/revisions-table/revisions-table.component';
import { WheelsTableComponent } from './by-vehicle/wheels-table/wheels-table.component';
import { EditCleaningCardComponent } from './edit-card/cleaning/edit-card.component';
import { EditOdometerCardComponent } from './edit-card/odometer/edit-card.component';
import { MaintenanceTableComponent } from './table/maintenance-table.component';

@NgModule({
  declarations: [
    MaintenanceTableComponent,
    CleaningsTableComponent,
    ItvsTableComponent,
    RevisionsTableComponent,
    OdometersTableComponent,
    WheelsTableComponent,
    MaintenanceByVehicleTablesComponent,
    EditCleaningCardComponent,
    EditOdometerCardComponent,
    RepairmentsTableComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule /* This component is using vehicles routing /admin/vehicles */,
    MyAngularMaterialModule,
    CustomPipesModule,
    DurationPickerModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaintenanceTableComponent,
    CleaningsTableComponent,
    ItvsTableComponent,
    RevisionsTableComponent,
    OdometersTableComponent,
    WheelsTableComponent,
    MaintenanceByVehicleTablesComponent,
    EditCleaningCardComponent,
    EditOdometerCardComponent,
    RepairmentsTableComponent,
  ],
})
export class MaintenanceComponentsModule {}
