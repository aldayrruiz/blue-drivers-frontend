export enum VehicleFuel {
  DIESEL = 'DIESEL',
  GASOLINE = 'GASOLINE',
  ELECTRIC = 'ELECTRIC',
}

export function fuelLabel(fuel: VehicleFuel): string {
  switch (fuel) {
    case VehicleFuel.DIESEL:
      return 'Diesel';
    case VehicleFuel.GASOLINE:
      return 'Gasolina';
    case VehicleFuel.ELECTRIC:
      return 'Eléctrico';
  }
}
