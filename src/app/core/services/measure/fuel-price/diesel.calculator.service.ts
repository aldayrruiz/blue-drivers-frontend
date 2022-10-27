import { Injectable } from '@angular/core';
import { PriceFuelCalculator } from './calculator.interface';

@Injectable({ providedIn: 'root' })
export class DieselPriceFuelCalculator implements PriceFuelCalculator {
  getPrice(distance: number): number {
    // * 1,8 euros/litro y 8 litros/100km
    const price = (distance * 1.8 * 8) / 100;
    return price;
  }
}
