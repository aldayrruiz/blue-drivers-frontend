import { Injectable } from '@angular/core';
import { PriceFuelCalculator } from './calculator.interface';

// * Si gasolina: 8 litros/100km a 1.6€/litro de gasolina
@Injectable({ providedIn: 'root' })
export class GasolinePriceFuelCalculator implements PriceFuelCalculator {
  getPrice(distance: number): number {
    // * 12.8€ is equivalent to drive during 100km
    const price = (distance * 12.8) / 100;
    return price;
  }
}
