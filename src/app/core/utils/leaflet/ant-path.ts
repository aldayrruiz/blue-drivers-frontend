import { antPath } from 'leaflet-ant-path';

const antPathOptions = {
  delay: 357,
  dashArray: [10, 25],
  weight: 4,
  color: '#0000FF',
  pulseColor: '#FFFFFF',
  paused: false,
  reverse: false,
  hardwareAccelerated: true,
};

export const createAntPath = (route: number[][]) => {
  return antPath(route, antPathOptions);
};
