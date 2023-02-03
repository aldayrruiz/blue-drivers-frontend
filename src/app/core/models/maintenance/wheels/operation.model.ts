/* eslint-disable @typescript-eslint/naming-convention */
export enum WheelsOperation {
  Inspection = 'Inspection',
  Substitution = 'Substitution',
}

export const getWheelsOperationLabel = (operation: WheelsOperation) => {
  switch (operation) {
    case WheelsOperation.Inspection:
      return 'Inspección visual';
    case WheelsOperation.Substitution:
      return 'Sustitución';
  }
};
