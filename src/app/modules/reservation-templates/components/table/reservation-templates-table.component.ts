import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationTemplate } from '@core/models';
import { ErrorMessageService, ReservationTemplateService, SnackerService } from '@core/services';
import { DeleteReservationTemplateComponent } from '@modules/reservation-templates/dialogs/delete-reservation-template/delete-reservation-template.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { finalize } from 'rxjs/operators';

interface ReservationTemplateRow {
  id: string;
  title: string;
}

@Component({
  selector: 'app-reservation-templates-table',
  templateUrl: './reservation-templates-table.component.html',
  styleUrls: ['./reservation-templates-table.component.css'],
})
export class ReservationTemplatesTableComponent extends BaseTableComponent<ReservationTemplate, ReservationTemplateRow> implements OnInit {
  columns = ['title', 'edit', 'delete'];

  constructor(
    private reservationTemplateSrv: ReservationTemplateService,
    private errorMessage: ErrorMessageService,
    private snacker: SnackerService,
    private dialog: MatDialog
  ) {
    super();
  }

  preprocessData(data: ReservationTemplate[]): ReservationTemplateRow[] {
    return data.map((template) => ({
      id: template.id,
      title: template.title,
    }));
  }

  fetchDataAndUpdate(): void {
    this.reservationTemplateSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((templates) => this.initTable(templates));
  }

  openDeleteDialog(row: ReservationTemplateRow): void {
    const dialog = this.dialog.open(DeleteReservationTemplateComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(row);
      }
    });
  }

  edit(template) {
    console.log(template);
  }

  private delete(row: ReservationTemplateRow) {
    this.reservationTemplateSrv.delete(row.id).subscribe(
      async () => {
        const newRows = this.models.filter((v) => v.id !== row.id);
        this.initTable(newRows);
        const msg = `La plantilla de reserva ${row.title} ha sido eliminada.`;
        this.snacker.showSuccessful(msg);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      }
    );
  }
}
