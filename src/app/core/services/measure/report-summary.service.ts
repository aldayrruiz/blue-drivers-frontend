import { Injectable } from '@angular/core';
import { ReportSummary } from '../../models/report.summary.model';
import { fromKnotsToKph, fromMetersToKm } from './converter';

@Injectable({ providedIn: 'root' })
export class ReportSummarySerializer {
  /**
   * Convert values returned in:
   * * knots to kilometers per hour.
   * * meters to kilometers.
   *
   * @param summary
   */
  convert(summary: ReportSummary): ReportSummary {
    const result = { ...summary };
    result.averageSpeed = fromKnotsToKph(summary.averageSpeed);
    result.maxSpeed = fromKnotsToKph(summary.maxSpeed);
    result.distance = fromMetersToKm(summary.distance);
    return result;
  }
}
