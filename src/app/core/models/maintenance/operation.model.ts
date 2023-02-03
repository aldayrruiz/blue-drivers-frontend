/* eslint-disable @typescript-eslint/naming-convention */

export enum MaintenanceOperationType {
  Cleaning = 'Cleaning',
  Itv = 'Itv',
  Odometer = 'Odometer',
  Revision = 'Revision',
  Wheels = 'Wheels',
}

export const getOperationTypeLabel = (operationType: MaintenanceOperationType) => {
  switch (operationType) {
    case MaintenanceOperationType.Cleaning:
      return 'Limpieza';
    case MaintenanceOperationType.Itv:
      return 'Pasar la ITV';
    case MaintenanceOperationType.Odometer:
      return 'Kilometraje';
    case MaintenanceOperationType.Revision:
      return 'Revisión periódica';
    case MaintenanceOperationType.Wheels:
      return 'Cambio de neumáticos';
  }
};
