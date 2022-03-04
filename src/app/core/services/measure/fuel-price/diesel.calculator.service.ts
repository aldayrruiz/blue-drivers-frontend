import { Injectable } from '@angular/core';
import { PriceFuelCalculator } from './calculator.interface';

// * Si diésel: 6 litros/100km a 1.5€/litro de diésel
@Injectable({ providedIn: 'root' })
export class DieselPriceFuelCalculator implements PriceFuelCalculator {
  getPrice(distance: number): number {
    // * 9€ is equivalent to drive during 100km
    const price = (distance * 9) / 100;
    return price;
  }
}
