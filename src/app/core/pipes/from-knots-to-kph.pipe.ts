import { Pipe, PipeTransform } from '@angular/core';
import { fromKnotsToKph } from '../services';

@Pipe({ name: 'fromKnotsToKph' })
export class FromKnotsToKph implements PipeTransform {
  /**
   * Convert knots into kilometers per hour.
   *
   * @param value
   * @param args
   * @returns
   */
  transform(value: string | number, ...args: unknown[]): number {
    const knots = Number(value);
    const kph = fromKnotsToKph(knots);
    return kph;
  }
}
