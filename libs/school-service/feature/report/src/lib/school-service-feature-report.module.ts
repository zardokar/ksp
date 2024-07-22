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
import { TempLicensePersonForgReportComponent } from './temp-license-person-forg-report/temp-license-person-forg-report.component';
import { TempLicensePersonThaiReportComponent } from './temp-license-person-thai-report/temp-license-person-thai-report.component';
import { TempLicenseListThaiReportComponent } from './temp-license-list-thai-report/temp-license-list-thai-report.component';
import { TempLicenseListForgReportComponent } from './temp-license-list-forg-report/temp-license-list-forg-reportcomponent';
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
      { path: 'temp-license-person-thai', component: TempLicensePersonForgReportComponent },
      { path: 'temp-license-person-forg', component: TempLicensePersonThaiReportComponent },
      { path: 'temp-license-list-thai', component: TempLicenseListThaiReportComponent },
      { path: 'temp-license-list-forg', component: TempLicenseListForgReportComponent },
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
    TempLicenseReportComponent,
    TempLicensePersonThaiReportComponent,
    TempLicensePersonForgReportComponent,
    TempLicenseListThaiReportComponent,
    TempLicenseListForgReportComponent
  ],
  exports: [
    TestReportComponent,
    TempLicenseReportComponent,
    TempLicensePersonThaiReportComponent,
    TempLicensePersonForgReportComponent,
    TempLicenseListThaiReportComponent,
    TempLicenseListForgReportComponent
  ],
})
export class SchoolServiceFeatureReportModule {}
