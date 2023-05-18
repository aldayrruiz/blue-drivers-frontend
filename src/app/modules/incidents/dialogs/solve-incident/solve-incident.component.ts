import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-solve-incident',
  templateUrl: './solve-incident.component.html',
  styleUrls: ['./solve-incident.component.css'],
})
export class SolveIncidentComponent {
  constructor(public dialogRef: MatDialogRef<SolveIncidentComponent>, @Inject(MAT_DIALOG_DATA) public solverMessage: string = '') {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
