import { Injectable } from '@angular/core';
import { AssetsService } from '../assets.service';

export interface VehicleIcon {
  label: string;
  value: number;
  src: string;
}

const yellow = { label: 'Amarillo', src: 'yellow-vehicle.png' };
const red = { label: 'Rojo', src: 'red-vehicle.png' };
const purple = { label: 'Violeta', src: 'purple-vehicle.png' };
const orange = { label: 'Naranja', src: 'orange-vehicle.png' };
const grey = { label: 'Gris', src: 'grey-vehicle.png' };
const green = { label: 'Verde', src: 'green-vehicle.png' };
const blue = { label: 'Azul', src: 'blue-vehicle.png' };

@Injectable({ providedIn: 'root' })
export class VehicleIconProvider {
  private basePath = 'icon/vehicles/';

  constructor(private readonly assetsService: AssetsService) {}

  /**
   *
   * @returns an array of vehicle icon paths
   */
  getIcons() {
    const vehicleIcons = this.getVehicleIcons().map((vehicleIcon) => {
      vehicleIcon.src = this.assetsService.getUrl(this.basePath + vehicleIcon.src);
      return vehicleIcon;
    });
    return vehicleIcons;
  }

  private getVehicleIcons(): VehicleIcon[] {
    const icons = [yellow, red, purple, orange, grey, green, blue];
    return icons.map((icon, index) => ({ value: index, ...icon }));
  }
}
