import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortDateTime' })
export class EssentialDatetimePipe implements PipeTransform {
  transform(date: Date | string): string {
    const format = 'MMMM d, y, HH:mm';
    date = new Date(date);
    return new DatePipe('es-ES').transform(date, format);
  }
}
