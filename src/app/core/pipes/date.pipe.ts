import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortDate' })
export class EssentialDatePipe implements PipeTransform {
  transform(date: Date | string): string {
    const format = 'MMMM d, y';
    date = new Date(date);
    return new DatePipe('es-ES').transform(date, format);
  }
}
