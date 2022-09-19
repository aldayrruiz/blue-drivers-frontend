/* eslint-disable @typescript-eslint/naming-convention */
export enum IncidentType {
  TIRE_PUNCTURE = 'TIRE_PUNCTURE',
  BANG = 'BANG',
  USAGE_PROBLEMS = 'USAGE_PROBLEMS',
  OTHERS = 'OTHERS',
}

export const incidentTypeLabel = (type: IncidentType) => {
  switch (type) {
    case IncidentType.BANG:
      return 'Choque';
    case IncidentType.TIRE_PUNCTURE:
      return 'Pinchazo';
    case IncidentType.USAGE_PROBLEMS:
      return 'Problemas de uso';
    case IncidentType.OTHERS:
      return 'Otros';
  }
};
