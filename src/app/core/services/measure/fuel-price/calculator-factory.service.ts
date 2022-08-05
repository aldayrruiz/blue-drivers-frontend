import { Injectable } from '@angular/core';
import { VehicleFuel } from '../../../models/vehicles/fuel.model';
import { PriceFuelCalculator } from './calculator.interface';
import { DieselPriceFuelCalculator } from './diesel.calculator.service';
import { ElectricPriceFuelCalculator } from './electric.calculator.service';
import { GasolinePriceFuelCalculator } from './gasoline.calculator.service';

// * Si diésel: 6 litros/100km a 1.5€/litro de diésel
// * Si gasolina: 8 litros/100km a 1.6€/litro de gasolina
// * Si eléctrico: 15 kWh/100km a 19c€/kWh

@Injectable({ providedIn: 'root' })
export class FuelPriceCalculatorFactory {
  constructor(
    private dieselPriceFuelCalculator: DieselPriceFuelCalculator,
    private gasolinePriceFuelCalculator: GasolinePriceFuelCalculator,
    private electricPriceFuelCalculator: ElectricPriceFuelCalculator
  ) {}

  getCalculator(fuel: VehicleFuel): PriceFuelCalculator {
    switch (fuel) {
      case VehicleFuel.DIESEL:
        return this.dieselPriceFuelCalculator;
      case VehicleFuel.GASOLINE:
        return this.gasolinePriceFuelCalculator;
      case VehicleFuel.ELECTRIC:
        return this.electricPriceFuelCalculator;
    }
  }
}
