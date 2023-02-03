/* eslint-disable @typescript-eslint/naming-convention */
export enum CleaningType {
  Inside = 'Inside',
  Outside = 'Outside',
}

export const getCleaningTypeLabel = (type: CleaningType): string => {
  switch (type) {
    case CleaningType.Inside:
      return 'Limpieza interior';
    case CleaningType.Outside:
      return 'Limpieza exterior';
  }
};
