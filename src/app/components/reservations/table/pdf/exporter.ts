import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReservationRow } from '../reservations-table.component';

export class ReservationTablePdfExporter {
  constructor(private rows: ReservationRow[]) {}

  export() {
    const columnHeaders = this.getColumHeaders();
    const tableRows = this.getTableRows();
    const pdf = this.createPdf(columnHeaders, tableRows);
    const pdfName = this.getPdfName();
    pdf.save(pdfName);
  }

  private getColumHeaders() {
    return [['Propietario', 'Vehicle', 'Fecha de recogida', 'Duración']];
  }

  private getTableRows() {
    return this.rows.map((row) => {
      const { owner, vehicle, startFormatted, hourMin } = row;
      return [owner, vehicle, startFormatted, hourMin];
    });
  }

  private getPdfName() {
    const today = format(new Date(), 'ddMMyyyy');
    const pdfName = `Reservations_${today}`;
    return pdfName;
  }

  private createPdf(columnHeaders: string[][], tableRows: string[][]) {
    const pdf = new jsPDF();
    autoTable(pdf, { head: columnHeaders, body: tableRows });
    return pdf;
  }
}
