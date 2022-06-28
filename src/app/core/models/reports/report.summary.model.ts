export interface ReportSummary {
  deviceId: number;
  deviceName: string;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  spentFuel: number;
  startOdometer: number;
  endOdometer: number;
  startTime: string;
  endTime: string;
  engineHours: number;
  realStartTime: string;
  realEndTime: string;
}
