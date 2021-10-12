import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IncidentsRoutingModule } from 'src/app/pages/incidents/incidents-routing.module';
import { MyAngularMaterialModule } from 'src/app/shared/angular-material.module';
import { IncidentDetailsComponent } from './details/incident-details.component';
import { IncidentsTableComponent } from './table/incidents-table.component';

@NgModule({
  declarations: [IncidentsTableComponent, IncidentDetailsComponent],
  imports: [
    CommonModule,
    IncidentsRoutingModule /* This component is using incidents routing /admin/incidents */,
    MyAngularMaterialModule,
  ],
  exports: [IncidentsTableComponent, IncidentDetailsComponent],
})
export class IncidentsComponentsModule {}
