import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthLabel' })
export class MonthLabel implements PipeTransform {
  transform(month: number): string {
    const date = new Date();
    date.setMonth(month - 1);

    return date.toLocaleString('es-ES', { month: 'long' });
  }
}
