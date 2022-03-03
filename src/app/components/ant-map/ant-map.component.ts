import { Component, OnInit } from '@angular/core';
import { SnackerService } from 'src/app/core';
import { Position } from 'src/app/core/models/positions/position.model';
import { createAntPath } from 'src/app/core/utils/leaflet/ant-path';
import { MapConfiguration } from 'src/app/core/utils/leaflet/map-configuration';
import { MapCreator } from 'src/app/core/utils/leaflet/map-creator';

@Component({
  selector: 'app-ant-map',
  templateUrl: './ant-map.component.html',
  styleUrls: ['./ant-map.component.css'],
})
export class AntMapComponent implements OnInit {
  private map: L.Map;

  constructor(private readonly snacker: SnackerService) {}

  ngOnInit(): void {
    this.initMap();
  }

  addAntPath(positions: Position[]) {
    if (positions.length === 0) {
      this.snacker.showError('Se recibieron 0 posiciones');
      return;
    }
    positions = this.removeInvalidPositions(positions);
    const latLongs = this.convertPositionsToLatLng(positions);
    const antPath = createAntPath(latLongs);
    this.map.addLayer(antPath);
    this.map.fitBounds(antPath.getBounds());
  }

  private initMap(): void {
    const { map } = MapCreator.create(new MapConfiguration());
    this.map = map;
  }

  private convertPositionsToLatLng(positions: Position[]) {
    const latLongs = positions.map((position) => {
      return [position.latitude, position.longitude];
    });

    return latLongs;
  }

  private removeInvalidPositions(positions: Position[]) {
    return positions.filter((position) => position.valid);
  }
}
