import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'essential' })
export class EssentialDatetimePipe implements PipeTransform {
  transform(date: Date | string, day: number, format: string = 'MMMM d, y, HH:mm'): string {
    date = new Date(date);
    return new DatePipe('es-ES').transform(date, format);
  }
}
