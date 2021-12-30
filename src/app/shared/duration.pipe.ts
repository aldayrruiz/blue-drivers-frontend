import { Pipe, PipeTransform } from '@angular/core';
import { formatDuration } from './utils/dates/custom-fns';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value === 0) {
      return '0 minutos';
    }
    return formatDuration({ hours: value });
  }
}
