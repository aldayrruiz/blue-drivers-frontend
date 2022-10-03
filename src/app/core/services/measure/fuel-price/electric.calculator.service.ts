import { Injectable } from '@angular/core';
import { PriceFuelCalculator } from './calculator.interface';

// * Si eléctrico: 15 kWh/100km a 19c€/kWh
@Injectable({ providedIn: 'root' })
export class ElectricPriceFuelCalculator implements PriceFuelCalculator {
  getPrice(distance: number): number {
    // * 2.85€ is equivalent to drive during 100km
    const price = (distance * 2.85) / 100;
    return price;
  }
}
