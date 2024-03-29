import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESeniorTeacherListComponent } from './e-senior-teacher-list/e-senior-teacher-list.component';
import { ESeniorTeacherDetailComponent } from './e-senior-teacher-detail/e-senior-teacher-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import {
  EServiceRewardAccountSearchComponent,
  EServiceRewardRequestSearchComponent,
  EServiceRewardSearchComponent,
} from '@ksp/shared/search';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
  RewardValidateRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { ESeniorTeacherConfirmComponent } from './e-senior-teacher-confirm/e-senior-teacher-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ESeniorTeacherRejectComponent } from './e-senior-teacher-reject/e-senior-teacher-reject.component';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ESeniorTeacherAccountListComponent } from './e-senior-teacher-account-list/e-senior-teacher-account-list.component';
import { ESeniorTeacherCreateAccountComponent } from './e-senior-teacher-create-account/e-senior-teacher-create-account.component';
import { ESeniorTeacherCheckListComponent } from './e-senior-teacher-check-list/e-senior-teacher-check-list.component';
import { ESeniorTeacherCheckComponent } from './e-senior-teacher-check/e-senior-teacher-check.component';
import { ESeniorTeacherReportAccountListComponent } from './e-senior-teacher-report-account-list/e-senior-teacher-report-account-list.component';
import { ESeniorTeacherCreateReportAccountComponent } from './e-senior-teacher-create-report-account/e-senior-teacher-create-report-account.component';
import { ESeniorTeacherReportListComponent } from './e-senior-teacher-report-list/e-senior-teacher-report-list.component';
import { ESeniorTeacherPrintListComponent } from './e-senior-teacher-print-list/e-senior-teacher-print-list.component';
import { ESeniorTeacherVisitListComponent } from './e-senior-teacher-visit-list/e-senior-teacher-visit-list.component';

const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ESeniorTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: ESeniorTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: ESeniorTeacherConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: ESeniorTeacherRejectComponent,
      },
      {
        path: 'account-list',
        component: ESeniorTeacherAccountListComponent,
      },
      {
        path: 'create-account',
        component: ESeniorTeacherCreateAccountComponent,
      },
      {
        path: 'check-list',
        component: ESeniorTeacherCheckListComponent,
      },
      {
        path: 'check/:id',
        component: ESeniorTeacherDetailComponent,
      },
      {
        path: 'check-confirm/:id',
        component: ESeniorTeacherCheckComponent,
      },
      {
        path: 'report-account-list',
        component: ESeniorTeacherReportAccountListComponent,
      },
      {
        path: 'create-report-account',
        component: ESeniorTeacherCreateReportAccountComponent,
      },
      {
        path: 'report-list',
        component: ESeniorTeacherReportListComponent,
      },
      {
        path: 'print-list',
        component: ESeniorTeacherPrintListComponent,
      },
      {
        path: 'visit-list',
        component: ESeniorTeacherVisitListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    MatTableModule,
    MatTabsModule,
    SharedFormOthersModule,
    ReactiveFormsModule,
    SharedFormSelfRewardFormModule,
    MatDialogModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    SelfServiceFormModule,
    EServiceRewardSearchComponent,
    ThaiDatePipe,
    LicenseCheckComponent,
    ValidateKspRequestComponent,
    MatPaginatorModule,
    RequestNoPipe,
    EServiceUiRewardRejectFormModule,
    RewardValidateRequestComponent,
    MatProgressSpinnerModule,
    EServiceRewardAccountSearchComponent,
    EServiceRewardRequestSearchComponent,
  ],
  declarations: [
    ESeniorTeacherListComponent,
    ESeniorTeacherDetailComponent,
    ESeniorTeacherConfirmComponent,
    ESeniorTeacherRejectComponent,
    ESeniorTeacherAccountListComponent,
    ESeniorTeacherCreateAccountComponent,
    ESeniorTeacherCheckListComponent,
    ESeniorTeacherCheckComponent,
    ESeniorTeacherReportAccountListComponent,
    ESeniorTeacherCreateReportAccountComponent,
    ESeniorTeacherReportListComponent,
    ESeniorTeacherPrintListComponent,
    ESeniorTeacherVisitListComponent,
  ],
  exports: [ESeniorTeacherListComponent, ESeniorTeacherDetailComponent],
})
export class EServiceProfessionalSeniorTeacherRewardModule {}
