import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { formatDuration } from '../utils/dates/custom-fns';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  /**
   * Value in milliseconds
   * @param value
   * @param args
   * @returns
   */
  transform(value: number, ...args: unknown[]): string {
    const milliseconds = Number(value);
    if (milliseconds === 0) {
      return '0 minutos';
    }
    const interval = intervalToDuration({ start: 0, end: milliseconds });
    const result = formatDuration(interval);
    return result;
  }
}
