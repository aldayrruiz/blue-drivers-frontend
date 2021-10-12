import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'any',
})
export class SnackerService {
  private duration = 4000;

  constructor(private _snackBar: MatSnackBar) {}

  openSuccessful(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.duration,
      panelClass: ['sucessful-color-snackbar'],
    });
  }

  openError(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.duration,
      panelClass: ['error-color-snackbar'],
    });
  }

  openWithAction(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: this.duration,
    });
  }
}
