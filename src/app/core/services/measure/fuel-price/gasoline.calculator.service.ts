import { Injectable } from '@angular/core';
import { PriceFuelCalculator } from './calculator.interface';

@Injectable({ providedIn: 'root' })
export class GasolinePriceFuelCalculator implements PriceFuelCalculator {
  getPrice(distance: number): number {
    // * 1,7 euros/litro y 6 litros/100km
    const price = (distance * 1.7 * 6) / 100;
    return price;
  }
}
