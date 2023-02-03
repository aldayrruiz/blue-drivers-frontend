/* eslint-disable @typescript-eslint/naming-convention */
export enum WheelsLocation {
  Front = 'Front',
  Back = 'Back',
  Both = 'Both',
}

export const getWheelsLocationLabel = (location: WheelsLocation) => {
  switch (location) {
    case WheelsLocation.Front:
      return 'Delanteros';
    case WheelsLocation.Back:
      return 'Traseros';

    case WheelsLocation.Both:
      return 'Delanteros y Traseros';
  }
};
