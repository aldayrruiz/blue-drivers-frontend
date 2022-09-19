import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from 'src/app/core/modules/angular-material.module';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { IncidentsRoutingModule } from 'src/app/pages/incidents/incidents-routing.module';
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
