import { Injectable } from '@angular/core';
import { PriceFuelCalculator } from './calculator.interface';

@Injectable({ providedIn: 'root' })
export class ElectricPriceFuelCalculator implements PriceFuelCalculator {
  getPrice(distance: number): number {
    // * 0,55 euros/kWh y 18kWh/100km
    const price = (distance * 0.55 * 18) / 100;
    return price;
  }
}
