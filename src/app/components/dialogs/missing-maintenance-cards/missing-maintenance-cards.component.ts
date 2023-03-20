import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-missing-maintenance-cards',
  templateUrl: './missing-maintenance-cards.component.html',
  styleUrls: ['./missing-maintenance-cards.component.css'],
})
export class DialogMissingMaintenanceCardsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogMissingMaintenanceCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
