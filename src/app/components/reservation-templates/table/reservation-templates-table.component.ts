import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ReservationTemplate } from 'src/app/core/models';
import {
  ErrorMessageService,
  ReservationTemplateService,
  SnackerService,
} from 'src/app/core/services';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { DeleteReservationTemplateComponent } from '../../dialogs/delete-reservation-template/delete-reservation-template.component';

interface ReservationTemplateRow {
  id: string;
  title: string;
}

@Component({
  selector: 'app-reservation-templates-table',
  templateUrl: './reservation-templates-table.component.html',
  styleUrls: ['./reservation-templates-table.component.css'],
})
export class ReservationTemplatesTableComponent
  extends BaseTableComponent<ReservationTemplate, ReservationTemplateRow>
  implements OnInit
{
  columns = ['title', 'edit', 'delete'];

  constructor(
    private readonly reservationTemplateSrv: ReservationTemplateService,
    private readonly errorMessage: ErrorMessageService,
    private readonly snacker: SnackerService,
    private readonly dialog: MatDialog
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
