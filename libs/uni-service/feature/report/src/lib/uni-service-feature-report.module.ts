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

import { UniAdmissionReportComponent } from './uni-admission-report/uni-admission-report.component'

import { UniReportPlateComponent } from './uni-report-plate/uni-report-plate.component';

import { UniServiceFormModule } from "../../../../form/src/lib/uni-service-form.module"

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      }
      ,{ path: 'test-report', component: TestReportComponent }
      ,{ path: 'uni-iframe_report', component: UniReportComponent }
      ,{ path: 'uni-degree-report', component: UniDegreeReportComponent }
      ,{ path: 'uni-admission-report', component: UniAdmissionReportComponent }
      ,{ path: 'uni-report', component: UniReportPlateComponent }
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
    UniServiceFormModule
],
  declarations: [
    UniReportComponent
    ,TestReportComponent
    ,UniDegreeReportComponent
    ,UniAdmissionReportComponent
    ,UniReportPlateComponent
  ],
  exports: [
    UniReportComponent
    ,TestReportComponent
    ,UniDegreeReportComponent
    ,UniAdmissionReportComponent
    ,UniReportPlateComponent
  ],
})
export class UniServiceFeatureReportModule {}
