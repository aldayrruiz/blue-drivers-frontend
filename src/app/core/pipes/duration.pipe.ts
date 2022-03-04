import { Pipe, PipeTransform } from '@angular/core';
import { fromMillisecondsToSeconds } from 'src/app/core/services/measure/report-summary/converter';
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
    if (value === 0) {
      return '0 minutos';
    }
    const seconds = fromMillisecondsToSeconds(value);
    return formatDuration({ seconds });
  }
}
