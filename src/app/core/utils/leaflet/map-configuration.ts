export const MADRID_GPS_LOCATION: [number, number] = [40.423516, -4.202832];

export class MapConfiguration {
  id: string;
  position: [number, number];
  initialZoom: number;
  maxZoom: number;
  minZoom: number;

  constructor(
    id: string = 'map',
    position: [number, number] = MADRID_GPS_LOCATION,
    initialZoom: number = 6,
    maxZoom: number = 18,
    minZoom: number = 3
  ) {
    this.id = id;
    this.position = position;
    this.initialZoom = initialZoom;
    this.maxZoom = maxZoom;
    this.minZoom = minZoom;
  }
}
