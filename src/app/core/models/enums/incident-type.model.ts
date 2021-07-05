export enum IncidentType {
  TIRE_PUNCTURE = 'TIRE_PUNCTURE',
  BANG = 'BANG',
  USAGE_PROBLEMS = 'USAGE_PROBLEMS',
  OTHERS = 'OTHERS',
}

export function translateType(type: IncidentType): string {
  if (type === IncidentType.BANG) {
    return 'Choque';
  }
  else if (type === IncidentType.TIRE_PUNCTURE) {
    return 'Pinchazo';
  }
  else if (type === IncidentType.USAGE_PROBLEMS) {
    return 'Problemas de uso';
  }
  else if (type === IncidentType.OTHERS) {
    return 'Otros';
  }
  return 'Unsupported type';
}
