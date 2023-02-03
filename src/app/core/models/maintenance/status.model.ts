export enum OperationMaintenanceStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
}

export const getMaintenanceOperationStatusLabel = (status: OperationMaintenanceStatus) => {
  switch (status) {
    case OperationMaintenanceStatus.NEW:
      return 'Nueva';
    case OperationMaintenanceStatus.PENDING:
      return 'Pendiente';
    case OperationMaintenanceStatus.EXPIRED:
      return 'Caducada';
    case OperationMaintenanceStatus.COMPLETED:
      return 'Completada';
  }
};
