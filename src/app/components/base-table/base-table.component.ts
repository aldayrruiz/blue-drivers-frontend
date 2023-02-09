import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export abstract class BaseTableComponent<M, T> implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  // models: are initial values for table. This would never be updated.
  // The only case when this value must be updated is when a row is deleted.
  // So we can reset to initial values.
  models: M[] = [];
  dataSource: MatTableDataSource<T>;

  isLoadingResults = true;

  abstract columns: string[];

  constructor() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.fetchDataAndUpdate();
  }

  showLoadingSpinner(): void {
    this.isLoadingResults = true;
  }

  hideLoadingSpinner(): void {
    this.isLoadingResults = false;
  }

  /**
   * Init table or update table.
   * Use it when you first receive rows data.
   * Or when you want to delete a row, and you want to that row never appear anymore.
   *
   * @param models
   */
  initTable(models: M[]): void {
    this.initDataSource();
    this.setModels(models);
    this.updateTable(models);
  }

  /**
   * Reset table to last values you passed to initTable().
   * Use it when user is not filtering.
   */
  resetTable(): void {
    this.updateTable(this.models);
  }

  /**
   * Update UI table rows.
   * Use it when rows must be filtered and your intent is to comeback to initial values later.
   *
   * @param models
   */
  updateTable(models: M[]): void {
    const data = this.preprocessData(models);
    this.dataSource.data = data;
  }

  /**
   * Update UI table rows.
   * Use it when rows must be filtered and your intent is to comeback to initial values later.
   *
   * It does the same that updateTable.
   */
  updateTableWithRows(rows: T[]): void {
    this.dataSource.data = rows;
  }

  private initDataSource() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
  }

  private setModels(models: M[]): void {
    this.models = models;
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
}
