import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IncidentsComponentsModule } from '@modules/incidents/components/incidents-components.module';
import { IncidentDialogsModule } from '@modules/incidents/dialogs/incident-dialogs.module';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';

@NgModule({
  declarations: [IncidentsComponent],
  imports: [CommonModule, IncidentsRoutingModule, IncidentsComponentsModule, IncidentDialogsModule],
})
export class IncidentsPageModule {}
