import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolveIncidentComponent } from '@modules/incidents/dialogs/solve-incident/solve-incident.component';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

@NgModule({
  declarations: [SolveIncidentComponent],
  imports: [FormsModule, CommonModule, MyAngularMaterialModule],
  exports: [SolveIncidentComponent],
})
export class IncidentDialogsModule {}
