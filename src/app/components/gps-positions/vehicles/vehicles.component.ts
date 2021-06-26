import { ChangeDetectionStrategy, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Vehicle } from 'src/app/core/models';

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

  constructor(private route: ActivatedRoute) {}

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
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private resolveData(): void {
    this.route.data.subscribe(data => {
      this.vehicles = data['vehicles'];
      console.log(this.vehicles);
    })
  }

  focusOn(vehicle: Vehicle): void {
    // TODO: Move the map to the vehicle.
  }
}
