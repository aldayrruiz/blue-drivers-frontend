import { formatDate } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Subject } from 'rxjs';
import { PositionService } from 'src/app/core';
import { Vehicle } from 'src/app/core/models';
import { Position } from 'src/app/core/models/position.model';
import { AssetsService } from 'src/app/core/services/assets.service';
import { PipeDates } from 'src/app/shared/utils/dates/pipe-dates';
import { MapConfiguration } from 'src/app/shared/utils/leaflet/map-configuration';
import { MapCreator } from 'src/app/shared/utils/leaflet/map-creator';

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
const refreshTime = 3000;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent implements OnInit, AfterViewInit {
  private map: L.Map;
  private positions: Position[];
  private vehicles: Vehicle[];
  private positionMarkersSubject: Subject<MyMarker[]> = new Subject<
    MyMarker[]
  >();
  positionMarkers$ = this.positionMarkersSubject.asObservable();
  positionMarkers: MyMarker[] = [];
  displayedColumns = ['feature', 'value'];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute,
    private positionSrv: PositionService,
    private assetsSrv: AssetsService
  ) {}

  ngOnInit(): void {
    this.listenForNewPositions();
    this.resolveData();
    this.initMap();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMarkers(this.vehicles, this.positions);
    });
    this.keepUpdatingMarkers(refreshTime);
  }

  initMap(): void {
    const { tiles, map } = MapCreator.create(new MapConfiguration());
    this.map = map;
  }

  getDataSource(position: Position): FeatureValue[] {
    if (!position) {
      return [];
    }
    const dTime = new Date(position.deviceTime);

    const deviceTime = formatDate(dTime, PipeDates.dateTimeFormat, this.locale);

    const dataSource: FeatureValue[] = [
      {
        feature: 'Latitud',
        value: position.latitude,
      },
      {
        feature: 'Longitud',
        value: position.longitude,
      },
      {
        feature: 'Altitud',
        value: position.altitude,
      },
      {
        feature: 'Tiempo del dispositivo',
        value: deviceTime,
      },
      {
        feature: 'Velocidad',
        value: position.speed,
      },
    ];

    return dataSource;
  }

  private initMarkers(vehicles: Vehicle[], positions: Position[]) {
    const positionsMarkers = [];

    vehicles.forEach((vehicle) => {
      const position = this.findPosition(positions, vehicle);
      const icon = this.randomIcon();
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

    if (!icon) {
      icon = this.randomIcon();
    }

    const latLng = this.latLng(position);
    const marker = L.marker(latLng, { icon }).addTo(this.map);
    return marker;
  }

  private resolveData(): void {
    this.route.data.subscribe((data) => {
      this.vehicles = data['vehicles'];
      // this.positions = data['positions'];
      this.positions = this.getFakePositions();
      const nVehicles = this.vehicles.length;
      const nPositions = this.positions.length;
      const msg = `Se ha recibido ${nPositions} posiciones y ${nVehicles} vehículos`;
      console.assert(nVehicles != nPositions, msg);
    });
  }

  private keepUpdatingMarkers(timeReset: number): void {
    const positionMarkers: MyMarker[] = [];

    setTimeout(() => {
      this.positionSrv.getAll().subscribe((positions) => {
        this.positions = this.getFakePositions();
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

  private randomIcon() {
    return L.icon({
      iconUrl: this.assetsSrv.getUrl(this.icons.pop()),
      iconSize: [22, 22], // size of the icon
      iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
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

  private icons = [
    'img/pink-car.png',
    'img/light-green-car.png',
    'img/light-blue-car.png',
    'img/brown-car.png',
    'img/orange-car.png',
    'img/yellow-car.png',
    'img/green-car.png',
    'img/red-car.png',
    'img/blue-car.png',
    'img/black-car.png',
  ];

  private getFakePositions() {
    return [
      {
        id: 4,
        deviceId: 12,
        protocol: '',
        deviceTime: new Date().toJSON(),
        fixTime: new Date().toJSON(),
        serverTime: new Date().toJSON(),
        outdated: false,
        valid: false,
        latitude: Math.floor(Math.random() * 42) + 1,
        longitude: Math.floor(Math.random() * 42) + 1,
        altitude: 600,
        speed: 3.4,
        course: 1,
        address: '',
        accuracy: 8,
      },
    ];
  }
}
