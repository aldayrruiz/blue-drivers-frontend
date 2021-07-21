import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  OnInit,
  LOCALE_ID,
  Inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Subject } from 'rxjs';
import { PositionService } from 'src/app/core';
import { Vehicle } from 'src/app/core/models';
import { Position } from 'src/app/core/models/position.model';
import { AssetsService } from 'src/app/core/services/assets.service';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

interface FeatureValue {
  feature: string;
  value: number | string | boolean;
}

interface VehiclePositionMarker {
  vehicle: Vehicle;
  position: Position;
  marker: L.Marker;
}

// Refresh time: Send GET HTTP to get positions, refresh map and data.
const refreshTime = 60000;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent implements OnInit, AfterViewInit {
  private dateTimeFormat = PipeDates.dateTimeFormat;
  private mapHtmlId = 'map';
  private map: L.Map;
  private positions: Position[];
  private vehicles: Vehicle[];
  private vehiclePositionMarkersSubject: Subject<VehiclePositionMarker[]> =
    new Subject<VehiclePositionMarker[]>();
  vehiclePositionMarkers$ = this.vehiclePositionMarkersSubject.asObservable();
  vehiclePositionMarkers: VehiclePositionMarker[] = [];
  displayedColumns = ['feature', 'value'];
  panelOpenState = false;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute,
    private positionSrv: PositionService,
    private assetsSrv: AssetsService
  ) {}

  initMap(): void {
    const mapPosition: [number, number] = [40.423516, -4.202832]; // Madrid, Spain
    const initialZoom = 6;

    const attribution =
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const maxZoom = 18;
    const minZoom = 3;

    this.map = L.map(this.mapHtmlId).setView(mapPosition, initialZoom);

    const tiles = L.tileLayer(urlTemplate, {
      maxZoom: maxZoom,
      minZoom: minZoom,
      attribution: attribution,
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    this.keepSubscribed();
    this.resolveData();
    this.initMap();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMarkers(this.vehicles, this.positions);
    });
    this.keepResetingMarkers(refreshTime);
  }

  focusOn(vehicle: Vehicle): void {
    const vehicleMarker = this.vehiclePositionMarkers.find(
      (vehicleMarker) => vehicleMarker.vehicle.id == vehicle.id
    );
    const latlng = vehicleMarker.marker.getLatLng();
    this.map.panTo(latlng);
  }

  getDataSource(position: Position): FeatureValue[] {
    if (position === undefined) {
      return [];
    }
    const sTime = new Date(position.serverTime);
    const dTime = new Date(position.deviceTime);

    const serverTime = formatDate(sTime, this.dateTimeFormat, this.locale);
    const deviceTime = formatDate(dTime, this.dateTimeFormat, this.locale);

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
        feature: 'Tiempo de dispositivo',
        value: deviceTime,
      },
      {
        feature: 'Tiempo del servidor',
        value: serverTime,
      },
      {
        feature: 'Velocidad',
        value: position.speed,
      },
    ];

    return dataSource;
  }

  private initMarkers(vehicles: Vehicle[], positions: Position[]): void {
    vehicles.forEach((vehicle: Vehicle) => {
      const position = this.getPosFromVehicle(positions, vehicle);
      if (position) {
        const latlng = this.latLng(position);
        const marker = L.marker(latlng, {
          icon: this.createIconMarker(),
        }).addTo(this.map);
        this.updateData([
          ...this.vehiclePositionMarkers,
          {
            vehicle: vehicle,
            position: position,
            marker: marker,
          },
        ]);
      } else {
        this.updateData([
          ...this.vehiclePositionMarkers,
          {
            vehicle: vehicle,
            position: undefined,
            marker: undefined,
          },
        ]);
      }
    });
  }

  private resolveData(): void {
    this.route.data.subscribe((data) => {
      this.vehicles = data['vehicles'];
      this.positions = data['positions'];

      if (this.vehicles.length !== this.positions.length) {
        const nV = this.vehicles.length;
        const nP = this.positions.length;
        console.error(`Se ha recibido ${nP} posiciones y ${nV} vehículos`);
      }
    });
  }

  private keepResetingMarkers(timeReset: number): void {
    let newData: VehiclePositionMarker[] = [];

    setTimeout(() => {
      this.positionSrv.getAll().subscribe((positions: Position[]) => {
        this.positions = positions;
        this.vehiclePositionMarkers.forEach((vehiclePositionMarker) => {
          const vehicle = vehiclePositionMarker.vehicle;
          let marker = vehiclePositionMarker.marker;
          const position = this.getPosFromVehicle(positions, vehicle);
          if (position) {
            const latlng = this.latLng(position);
            if (!marker) {
              marker = L.marker(latlng, {
                icon: this.createIconMarker(),
              }).addTo(this.map);
            }
            marker.setLatLng(latlng);
            newData = [...newData, { vehicle, position, marker }];
          } else {
            if (marker) {
              marker.remove();
            }
            newData = [
              ...newData,
              { vehicle: vehicle, position: undefined, marker: undefined },
            ];
          }
        });
        this.updateData(newData);
      });
      this.keepResetingMarkers(timeReset);
    }, timeReset);
  }

  private createIconMarker(): L.Icon {
    return L.icon({
      iconUrl: this.assetsSrv.getUrl('img/full-moon.png'),
      iconSize: [15, 15], // size of the icon
      iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    });
  }

  private getPosFromVehicle(positions: Position[], vehicle: Vehicle): Position {
    return positions.find((pos) => pos.deviceId === vehicle.gps_device.id);
  }

  private latLng = (p: Position): [number, number] => [p.latitude, p.longitude];

  private keepSubscribed() {
    this.vehiclePositionMarkers$.subscribe((data) => {
      this.vehiclePositionMarkers = data;
    });
  }

  private updateData(data: VehiclePositionMarker[]) {
    this.vehiclePositionMarkersSubject.next(data);
  }
}
