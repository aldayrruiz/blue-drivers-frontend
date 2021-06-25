import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-gps-positions',
  templateUrl: './gps-positions.component.html',
  styleUrls: ['./gps-positions.component.css'],
})
export class GpsPositionsComponent implements AfterViewInit {

  private mapHtmlId = 'map';
  private map: L.Map;
  
  constructor() {}

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

  ngAfterViewInit(): void {
    this.initMap();
  }
}
