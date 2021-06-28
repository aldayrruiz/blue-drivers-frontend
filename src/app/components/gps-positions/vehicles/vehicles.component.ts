import { ChangeDetectionStrategy, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { PositionService } from 'src/app/core';
import { Vehicle } from 'src/app/core/models';
import { Position } from 'src/app/core/models/position.model';

interface VehicleMarker {
  marker: L.Marker;
  vehicle: Vehicle;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent implements OnInit, AfterViewInit {

  private mapHtmlId = 'map';
  private map: L.Map;
  vehicles: Vehicle[];
  positions: Position[];
  vehicleMarkers: VehicleMarker[];

  constructor(
    private route: ActivatedRoute,
    private positionSrv: PositionService
    ) {}

  initMap(): void {
    const mapPosition: [number, number] = [40.423516, -4.202832] // Madrid, Spain
    const initialZoom = 6;
    
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const maxZoom = 18;
    const minZoom = 3;

    this.map = L.map(this.mapHtmlId).setView(mapPosition, initialZoom);

    const tiles = L.tileLayer(urlTemplate, {
      maxZoom: maxZoom,
      minZoom: minZoom,
      attribution: attribution
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    this.resolveData();
    this.initMarkers(this.positions);
    this.keepResetingMarkers(5000);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private resolveData(): void {
    this.route.data.subscribe(data => {
      this.vehicles = data['vehicles'];
      this.positions = data['positions'];

      if (this.vehicles.length !== this.positions.length) {
        console.error(`Se ha recibido ${this.positions.length} posiciones y ${this.vehicles.length} vehículos`);
      }
    })
  }

  focusOn(vehicle: Vehicle): void {
    // TODO: Move the map to the vehicle.
  }

  private initMarkers(positions: Position[]): void {
    this.vehicles.forEach((vehicle: Vehicle) => {
      // Get position of vehicle
      const latlng = this.getLatLngFromVehicle(positions, vehicle);
      // Set marker on map and link it to a vehicle
      const marker = L.marker(latlng, {icon: this.createIconMarker()}).addTo(this.map);
      this.vehicleMarkers.push({vehicle: vehicle, marker: marker});
    });
  }

  private keepResetingMarkers(timeReset: number): void {
    setTimeout(() => {
      this.positionSrv.getAll().subscribe((positions: Position[]) => {
        this.vehicleMarkers.forEach(vehicleMarker => {
          const vehicle = vehicleMarker.vehicle;
          const marker = vehicleMarker.marker;
          const latlng = this.getLatLngFromVehicle(positions, vehicle);
          marker.setLatLng(latlng);
        })
        this.keepResetingMarkers(timeReset);
      })
    }, timeReset);
  }

  createIconMarker(): L.Icon {
    return L.icon({
      iconUrl: 'assets/full-moon.png',
      iconSize:     [15, 15], // size of the icon
      iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });
  }

  private getLatLngFromVehicle(positions: Position[], vehicle: Vehicle): [number, number] {
    const position = positions.find(position => position.deviceId === vehicle.gps_device.id);
    return [position.latitude, position.longitude]
  }
}
