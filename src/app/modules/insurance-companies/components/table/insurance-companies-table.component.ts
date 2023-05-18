import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuranceCompany } from '@core/models';
import { ErrorMessageService, InsuranceCompanyService, SnackerService } from '@core/services';
import { DeleteInsuranceCompanyComponent } from '@modules/insurance-companies/dialogs/delete-insurance-company/delete-insurance-company.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { finalize } from 'rxjs/operators';

export interface InsuranceCompanyRow {
  id: string;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-insurance-companies-table',
  templateUrl: './insurance-companies-table.component.html',
  styleUrls: ['./insurance-companies-table.component.css'],
})
export class InsuranceCompaniesTableComponent extends BaseTableComponent<InsuranceCompany, InsuranceCompanyRow> implements OnInit {
  columns = ['name', 'phone', 'edit', 'delete'];

  constructor(
    private insuranceCompanyService: InsuranceCompanyService,
    private errorMessage: ErrorMessageService,
    private snacker: SnackerService,
    private dialog: MatDialog
  ) {
    super();
  }

  openDeleteDialog(company: InsuranceCompany): void {
    const dialog = this.dialog.open(DeleteInsuranceCompanyComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteInsuranceCompany(company);
      }
    });
  }

  preprocessData(companies: InsuranceCompany[]): InsuranceCompanyRow[] {
    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      phone: company.phone,
    }));
  }

  fetchDataAndUpdate(): void {
    this.insuranceCompanyService
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((companies) => this.initTable(companies));
  }

  private deleteInsuranceCompany(company: InsuranceCompanyRow) {
    this.insuranceCompanyService.delete(company.id).subscribe(
      async () => {
        const newCompanies = this.models.filter((v) => v.id !== company.id);
        this.initTable(newCompanies);
        const msg = `La compañía aseguradora ${company.name} ha sido eliminada.`;
        this.snacker.showSuccessful(msg);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      }
    );
  }
}
