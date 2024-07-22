import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';

import { TopNavComponent } from '@ksp/shared/menu';

import { TestReportComponent } from './test-report/test-report.component';

import { UniReportComponent } from './uni-report/uni-report.component';

import { UniDegreeReportComponent } from './uni-degree-report/uni-degree-report.component';

import { UniContainerPageComponent } from '../../../../pages/src/container/uni-container-page.component'

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      { path: 'test-report', component: TestReportComponent },
      { path: 'uni-report', component: UniReportComponent },
      { path: 'uni-degree-report', component: UniDegreeReportComponent }
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    TopNavComponent,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UniReportComponent,
    TestReportComponent,
    UniDegreeReportComponent
  ],
  exports: [
    UniReportComponent,
    TestReportComponent,
    UniDegreeReportComponent
  ],
})
export class UniServiceFeatureReportModule {}
