import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from '@core/pipes/custom-pipes.module';
import { IncidentsRoutingModule } from '@modules/incidents/pages/incidents/incidents-routing.module';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { IncidentDetailsComponent } from './details/incident-details.component';
import { IncidentsTableComponent } from './table/incidents-table.component';

@NgModule({
  declarations: [IncidentsTableComponent, IncidentDetailsComponent],
  imports: [
    CommonModule,
    IncidentsRoutingModule /* This component is using incidents routing /admin/incidents */,
    MyAngularMaterialModule,
    CustomPipesModule,
    ReactiveFormsModule,
  ],
  exports: [IncidentsTableComponent, IncidentDetailsComponent],
})
export class IncidentsComponentsModule {}
