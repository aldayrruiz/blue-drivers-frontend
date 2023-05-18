import { Position, User } from '../../models';
import { median } from '../math';

export const onlyBeaconPositions = (position: Position) => position.attributes.beacon1Rssi;

export const speedGreaterThanZero = (position: Position) => position.speed > 0;

export const getIntensitiesByPassenger = (positions: Position[], users: User[]) => {
  // Crear un Map, que tenga como key al usuario y como value un array con
  // las intensidades reportadas por los beacons
  const intensitiesByPassenger = new Map<User, number[]>();
  positions.forEach((position) => {
    const beacons = [
      position.attributes?.beacon1Instance?.toUpperCase(),
      position.attributes?.beacon2Instance?.toUpperCase(),
      position.attributes?.beacon3Instance?.toUpperCase(),
      position.attributes?.beacon4Instance?.toUpperCase(),
      position.attributes?.beacon5Instance?.toUpperCase(),
    ];
    beacons
      .filter((beacon) => beacon)
      .forEach((beacon, i) => {
        const passenger = users.find((user) => user.ble_user_id === beacon);
        if (passenger) {
          const rssi = position.attributes?.[`beacon${i + 1}Rssi`];
          if (intensitiesByPassenger.has(passenger)) {
            intensitiesByPassenger.set(passenger, [...intensitiesByPassenger.get(passenger), rssi]);
          } else {
            intensitiesByPassenger.set(passenger, [rssi]);
          }
        }
      });
  });

  return intensitiesByPassenger;
};

export const getPassengersMedianIsGreaterThanLimit = (intensitiesByUser: Map<User, number[]>, limit: number = -70) => {
  // Para cada usuario obtener la mediana correspondiente a sus intensidades.
  // Si la mediana supera el limite (-70), entonces considerar que el usuario estaba dentro del vehículo.
  const passengers: User[] = [];
  intensitiesByUser.forEach((intensities, user) => {
    const intensityMedian = median(intensities);
    if (intensityMedian > limit) {
      passengers.push(user);
    }
  });
  return passengers;
};
