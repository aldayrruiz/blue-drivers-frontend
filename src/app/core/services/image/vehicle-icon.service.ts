import { Injectable } from '@angular/core';
import { DEFAULT_VEHICLE_ICON } from '@core/constants/vehicles';
import { AssetsService } from '@core/services';
import { ImageService } from '@core/services/image/image.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleIconProvider {
  constructor(private assetsService: AssetsService, private imageService: ImageService) {}

  getFullUrlOrDefaultFromVehicle(path: string): string {
    return this.imageService.getFullUrl(path) || this.assetsService.getUrl(DEFAULT_VEHICLE_ICON);
  }
}
