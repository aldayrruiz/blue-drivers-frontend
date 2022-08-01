import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MonthlyReport } from 'src/app/core/models';
import { MonthlyReportService } from 'src/app/core/services/api/monthly-report.service';
import { BaseTableComponent } from '../../base-table/base-table.component';
interface MonthlyReportRow {
  id: string;
  month: number;
  year: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class ReportsTableComponent
  extends BaseTableComponent<MonthlyReport, MonthlyReportRow>
  implements OnInit
{
  columns = ['month', 'year', 'download'];

  constructor(private monthlyReportService: MonthlyReportService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  preprocessData(data: MonthlyReport[]): MonthlyReportRow[] {
    return data.map((report) => ({
      id: report.id,
      month: report.month,
      year: report.year,
    }));
  }

  fetchDataAndUpdate(): void {
    this.monthlyReportService
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((reports) => {
        this.initTable(reports);
      });
  }

  downloadPdf(report: MonthlyReport): void {
    this.monthlyReportService.view(report.id).subscribe((data) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = `BLUEDrivers_Reporte_${report.month}_${report.year}.pdf`;
      link.click();
    });
  }
}
