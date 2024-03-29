import { Component, OnInit } from '@angular/core';
import { Position } from '@core/models';
import { createAntPath } from '@core/utils/leaflet/ant-path';
import { MapConfiguration } from '@core/utils/leaflet/map-configuration';
import { MapCreator } from '@core/utils/leaflet/map-creator';

@Component({
  selector: 'app-ant-map',
  templateUrl: './ant-map.component.html',
  styleUrls: ['./ant-map.component.css'],
})
export class AntMapComponent implements OnInit {
  private map: L.Map;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  addAntPath(positions: Position[]) {
    if (positions.length === 0) {
      return;
    }

    const latLongs = this.convertPositionsToLatLng(positions);
    const antPath = createAntPath(latLongs);
    this.map.addLayer(antPath);
    this.map.fitBounds(antPath.getBounds());
  }

  private initMap(): void {
    const { map } = MapCreator.create(new MapConfiguration('antMap'));
    this.map = map;
  }

  private convertPositionsToLatLng(positions: Position[]) {
    const latLongs = positions.map((position) => [position.latitude, position.longitude]);

    return latLongs;
  }
}
