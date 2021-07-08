import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'any',
})
export class SnackerService {
  private duration = 4000;

  constructor(private _snackBar: MatSnackBar) {}

  open(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.duration,
    });
  }

  openWithAction(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: this.duration,
    });
  }
}
