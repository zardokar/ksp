import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TopNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';

import { TestReportComponent } from './test-report/test-report.component';
import { TempLicenseReportComponent } from './temp-license-report/temp-license-report.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'temp-license',
        component: TempLicenseReportComponent,
      },
      { path: 'test-report', component: TestReportComponent },
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
    TestReportComponent,
    TempLicenseReportComponent
  ],
  exports: [
    TestReportComponent,
    TempLicenseReportComponent
  ],
})
export class SchoolServiceFeatureReportModule {}
