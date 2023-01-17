import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatestWith, finalize } from 'rxjs/operators';
import { MonthlyReport } from 'src/app/core/models';
import { BillingReportService, DietReportService } from 'src/app/core/services';
import { MonthlyReportService } from 'src/app/core/services/api/monthly-report.service';
import { BaseTableComponent } from '../../base-table/base-table.component';
interface MonthlyReportRow {
  id: string;
  month: number;
  year: number;
  type: string;
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
  showOptionSelected = 'UsoDeVehículos';
  showOptions = [
    { display: 'Uso de vehículos', value: 'UsoDeVehículos' },
    { display: 'Dietas y gastos', value: 'DietasYGastos' },
    { display: 'Facturación', value: 'Facturación' },
  ];
  constructor(
    private monthlyReportService: MonthlyReportService,
    private billingReportService: BillingReportService,
    private dietReportService: DietReportService
  ) {
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
      type: report.type,
    }));
  }

  fetchDataAndUpdate(): void {
    this.getDataTableObservable()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((data) => {
        const reports = data[0].map((report) => ({ ...report, type: 'UsoDeVehículos' }));
        const diets = data[1].map((report) => ({ ...report, type: 'DietasYGastos' }));
        const billings = data[2].map((report) => ({ ...report, type: 'Facturación' }));
        const allReports = [...reports, ...diets, ...billings];
        this.initTable(allReports);
        this.onShowSelectionChanged();
      });
  }

  getDataTableObservable() {
    const observable1 = this.monthlyReportService.getAll();
    const observable2 = this.dietReportService.getAll();
    const observable3 = this.billingReportService.getAll();
    const combined = observable1.pipe(combineLatestWith(observable2, observable3));
    return combined;
  }

  downloadPdf(report: MonthlyReport): void {
    let view: Observable<any>;
    switch (report.type) {
      case 'UsoDeVehículos':
        view = this.monthlyReportService.view(report.id);
        break;

      case 'DietasYGastos':
        view = this.dietReportService.view(report.id);
        break;

      case 'Facturación':
        view = this.billingReportService.view(report.id);
        break;

      default:
        console.log('Error: report type not found');
        return;
    }
    view.subscribe((data) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = `BLUEDrivers_Informe_${report.type}_${report.month}_${report.year}.pdf`;
      link.click();
    });
  }

  onShowSelectionChanged() {
    if (this.showOptionSelected === '') {
      this.updateTable(this.models);
      return;
    }
    const value = this.showOptionSelected;
    const reports = this.filterReports(value);
    const reportsOrderedByMonth = this.orderReportsByMonth(reports);
    this.updateTable(reportsOrderedByMonth);
  }

  filterReports(type: string) {
    const reports = this.models.filter((model) => model.type === type);
    return reports;
  }

  private orderReportsByMonth(reports: MonthlyReport[]) {
    const reportsOrderedByMonth = reports.sort((a, b) => {
      const obj1: any = new Date(a.year, a.month-1);
      const obj2: any = new Date(b.year, b.month-1);
      return obj2 - obj1;
    });
    return reportsOrderedByMonth;
  }
}
