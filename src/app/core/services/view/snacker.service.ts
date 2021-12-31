import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Service to display snack bars customized (with own configuration).
 */
@Injectable({
  providedIn: 'any',
})
export class SnackerService {
  private duration = 4000;

  constructor(private readonly snackBar: MatSnackBar) {}

  showSuccessful(message: string): void {
    this.snackBar.open(message, '', {
      duration: this.duration,
      panelClass: ['successful-color-snackbar'],
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, '', {
      duration: this.duration,
      panelClass: ['error-color-snackbar'],
    });
  }

  showWithAction(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: this.duration,
    });
  }
}
