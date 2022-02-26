import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export abstract class BaseTableComponent<M, T>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // models: are initial values for table. This would never be updated.
  // So we can reset to initial values.
  models: M[] = [];
  dataSource: MatTableDataSource<T>;

  isLoadingResults = true;

  abstract columns: string[];

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fetchDataAndUpdate();
  }

  hideLoadingSpinner(): void {
    this.isLoadingResults = false;
  }

  initTable(models: M[]): void {
    this.setModels(models);
    this.updateTable(models);
  }

  resetTable(): void {
    this.updateTable(this.models);
  }

  updateTable(models: M[]): void {
    const data = this.preprocessData(models);
    this.dataSource.data = data;
  }

  updateTableWithRows(rows: T[]): void {
    this.dataSource.data = rows;
  }

  /**
   * Transform data into RowData.
   *
   * @param data data received from server, ie. User[]
   */
  abstract preprocessData(data: M[]): T[];

  /**
   * Fetch data from server using services. Data must not be fetched with resolvers.
   * Because, if there are a lot of data, we must load the page, then charge the data.
   */
  abstract fetchDataAndUpdate(): void;

  private setModels(models: M[]): void {
    this.models = models;
  }
}
