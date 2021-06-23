import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsRoutingModule } from 'src/app/pages/incidents/incidents-routing.module';
import { MyAngularMaterialModule } from 'src/app/shared/angular-material.module';
import { IncidentsTableComponent } from './incidents-table.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IncidentsRoutingModule, /* This component is using incidents routing /admin/incidents */
    MyAngularMaterialModule
  ],
  exports: [IncidentsTableComponent]
})
export class IncidentsTableModule { }
