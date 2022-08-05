import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';
import { formatDistanceToNowStrict, sub } from 'date-fns';
import es from 'date-fns/locale/es';
import * as L from 'leaflet';
import { Subject } from 'rxjs';
import { Position, User, Vehicle } from 'src/app/core/models';
import { fromKnotsToKph, PositionService } from 'src/app/core/services';
import { VehicleIcon, VehicleIconProvider } from 'src/app/core/services/view/vehicle-icon.service';
import { MapConfiguration } from 'src/app/core/utils/leaflet/map-configuration';
import { MapCreator } from 'src/app/core/utils/leaflet/map-creator';
import {
  getIntensitiesByPassenger,
  getPassengersMedianIsGreaterThanLimit,
  onlyBeaconPositions,
  speedGreaterThanZero,
} from 'src/app/core/utils/occupants/main';

interface FeatureValue {
  feature: string;
  value: number | string | boolean;
}

interface MyMarker {
  vehicle: Vehicle;
  position: Position;
  marker: L.Marker;
}

// Refresh time: Send GET HTTP to get positions, refresh map and data.
const refreshTime = 10000;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent implements OnInit, AfterViewInit {
  positionMarkersSubject = new Subject<MyMarker[]>();
  positionMarkers$ = this.positionMarkersSubject.asObservable();
  displayedColumns = ['feature', 'value'];
  passengersByVehicle = new Map<Vehicle, User[]>();

  private positionMarkers: MyMarker[] = [];
  private positions: Position[];
  private users: User[];
  private vehicles: Vehicle[];
  private map: L.Map;
  private icons: VehicleIcon[];

  constructor(
    private vehicleIconProvider: VehicleIconProvider,
    private positionSrv: PositionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.icons = this.vehicleIconProvider.getIcons();
  }

  ngOnInit(): void {
    this.listenForNewPositions();
    this.resolveData();
    this.initMap();
    this.keepUpdatingPassengers();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMarkers(this.vehicles, this.positions);
    });
    this.keepUpdatingMarkers(refreshTime);
  }

  initMap(): void {
    const { map } = MapCreator.create(new MapConfiguration('vehiclesMap'));
    this.map = map;
  }

  focusMapOnPosition(positionMarker: MyMarker) {
    this.map.setView(positionMarker.marker.getLatLng(), 15);
  }

  getDataSource(position: Position): FeatureValue[] {
    if (!position) {
      return [];
    }
    const timestamp = new Date(position.deviceTime);
    const distanceToNow = formatDistanceToNowStrict(timestamp, { addSuffix: true, locale: es });

    const dataSource: FeatureValue[] = [
      {
        feature: 'Última posición',
        value: distanceToNow,
      },
      {
        feature: 'Velocidad',
        value: fromKnotsToKph(Math.round(position.speed)) + 'km/h',
      },
    ];

    return dataSource;
  }

  private initMarkers(vehicles: Vehicle[], positions: Position[]) {
    const positionsMarkers = [];

    vehicles.forEach((vehicle) => {
      const position = this.findPosition(positions, vehicle);
      const vehicleIcon = this.getIconFromVehicle(vehicle);
      const icon = this.createLeafIcon(vehicleIcon.src);
      const marker = this.addMarkerToMap(position, icon);
      const myMarker = { vehicle, position, marker };
      positionsMarkers.push(myMarker);
    });

    this.updateMarkers(positionsMarkers);
  }

  private addMarkerToMap(position: Position, icon?: L.Icon<L.IconOptions>) {
    if (!position) {
      return undefined;
    }

    const latLng = this.latLng(position);
    const marker = L.marker(latLng, { icon }).addTo(this.map);
    return marker;
  }

  private resolveData(): void {
    this.route.data.subscribe((data) => {
      this.users = data.users;
      this.vehicles = data.vehicles;
      this.positions = data.positions;
      // this.positions = this.getFakePositions();
      const nVehicles = this.vehicles.length;
      const nPositions = this.positions.length;
      const msg = `Se ha recibido ${nPositions} posiciones y ${nVehicles} vehículos`;
      console.log(msg);
    });
  }

  private keepUpdatingMarkers(timeReset: number): void {
    if (!this.isThisPageActive()) {
      // Stop sending request to server to get new positions.
      return;
    }

    const positionMarkers: MyMarker[] = [];

    setTimeout(() => {
      this.positionSrv.lastKnown().subscribe((positions) => {
        this.positions = positions;
        // this.positions = this.getFakePositions();
        this.positionMarkers.forEach((positionMarker) => {
          const vehicle = positionMarker.vehicle;
          const visibleMarker = positionMarker.marker;
          // * If marker is on map remove it and get his icon (to put the same). Otherwise do not anything.
          visibleMarker?.remove();
          const icon = visibleMarker?.getIcon() as L.Icon<L.IconOptions>;
          // * Set a new marker on map with previous icon or a new one.
          const position = this.findPosition(this.positions, vehicle);
          const marker = this.addMarkerToMap(position, icon);
          positionMarkers.push({ vehicle, position, marker });
        });
        this.updateMarkers(positionMarkers);
      });
      this.keepUpdatingMarkers(timeReset);
    }, timeReset);
  }

  private createLeafIcon(iconSrc: string) {
    return L.icon({
      iconUrl: iconSrc,
      iconSize: [22, 22], // size of the icon
      iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
  }

  private getIconFromVehicle(vehicle: Vehicle) {
    const icon = this.icons.filter((i) => i.value === vehicle.icon)[0];
    return icon;
  }

  private findPosition(positions: Position[], vehicle: Vehicle) {
    return positions.find((pos) => pos.deviceId === vehicle.gps_device.id);
  }

  private latLng = (p: Position): [number, number] => [p.latitude, p.longitude];

  private listenForNewPositions() {
    this.positionMarkers$.subscribe((data) => {
      this.positionMarkers = data;
    });
  }

  private updateMarkers(myMarkers: MyMarker[]) {
    this.positionMarkersSubject.next(myMarkers);
  }

  private getFakePositions() {
    return [
      {
        latitude: Math.floor(Math.random() * 10),
        longitude: Math.floor(Math.random() * 10),
        deviceId: 1,
        deviceTime: new Date('2022-04-03T18:09:04.067Z').toJSON(),
        speed: 10.111254,
      },
      {
        latitude: Math.floor(Math.random() * 10),
        longitude: Math.floor(Math.random() * 10),
        deviceId: 2,
        deviceTime: new Date('2022-04-02T18:09:04.067Z').toJSON(),
        speed: 20,
      },
      {
        latitude: Math.floor(Math.random() * 10),
        longitude: Math.floor(Math.random() * 10),
        deviceId: 3,
        deviceTime: new Date('2022-03-03T18:09:04.067Z').toJSON(),
        speed: 30,
      },
    ];
  }

  private isThisPageActive() {
    const options: IsActiveMatchOptions = {
      matrixParams: 'exact',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'exact',
    };
    const isActive = this.router.isActive('/admin/positions/vehicles', options);
    return isActive;
  }

  private keepUpdatingPassengers() {
    if (!this.isThisPageActive()) {
      // Stop sending request to server to get new positions.
      return;
    }

    this.updatePassengers();
    setTimeout(() => {
      this.keepUpdatingPassengers();
    }, 300000);
  }

  private updatePassengers() {
    const vehicleIds = this.vehicles.map((vehicle) => vehicle.id);
    const now = new Date();
    const start = sub(now, { minutes: 20 });
    this.positionSrv.route(vehicleIds, start.toJSON(), now.toJSON()).subscribe((allPositions) => {
      const passengersByVehicle = new Map<Vehicle, User[]>();
      this.vehicles.forEach((vehicle) => {
        const positions = allPositions.filter(
          (position) =>
            onlyBeaconPositions &&
            speedGreaterThanZero &&
            position.deviceId === vehicle.gps_device.id
        );

        const intensitiesByPassenger = getIntensitiesByPassenger(positions, this.users);
        const passengers = getPassengersMedianIsGreaterThanLimit(intensitiesByPassenger, -70);
        passengersByVehicle.set(vehicle, passengers);
      });

      this.passengersByVehicle = passengersByVehicle;
      this.positionMarkersSubject.next(this.positionMarkers);
    });
  }
}
