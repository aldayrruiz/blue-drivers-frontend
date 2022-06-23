import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsTableComponent } from 'src/app/components/reports/table/table.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'table',
        component: ReportsTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
