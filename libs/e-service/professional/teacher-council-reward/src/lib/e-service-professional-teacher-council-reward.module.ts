import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ETeacherCouncilListComponent } from './e-teacher-council-list/e-teacher-council-list.component';
import { ETeacherCouncilDetailComponent } from './e-teacher-council-detail/e-teacher-council-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { MatDialogModule } from '@angular/material/dialog';
import { SelfServiceFeatureRewardModule } from '@ksp/self-service/feature/reward';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import {
  EServiceRewardAccountSearchComponent,
  EServiceRewardCreateDeclareSearchComponent,
  EServiceRewardDeclareSearchComponent,
  EServiceRewardRequestSearchComponent,
  EServiceRewardSearchComponent,
} from '@ksp/shared/search';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { ETeacherCouncilConfirmComponent } from './e-teacher-council-confirm/e-teacher-council-confirm.component';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
  RewardValidateRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ETeacherCouncilRejectComponent } from './e-teacher-council-reject/e-teacher-council-reject.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { ETeacherCouncilAccountListComponent } from './e-teacher-council-account-list/e-teacher-council-account-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ETeacherCouncilCreateAccountComponent } from './e-teacher-council-create-account/e-teacher-council-create-account.component';
import { ETeacherCouncilCheckComponent } from './e-teacher-council-check/e-teacher-council-check.component';
import { ETeacherCouncilCheckListComponent } from './e-teacher-council-check-list/e-teacher-council-check-list.component';
import { ETeacherCouncilDeclareComponent } from './e-teacher-council-declare/e-teacher-council-declare.component';
import { ETeacherCouncilCreateDeclareComponent } from './e-teacher-council-create-declare/e-teacher-council-create-declare.component';

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
        component: ETeacherCouncilListComponent,
      },
      {
        path: 'detail/:id',
        component: ETeacherCouncilDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: ETeacherCouncilConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: ETeacherCouncilRejectComponent,
      },
      {
        path: 'account-list',
        component: ETeacherCouncilAccountListComponent,
      },
      {
        path: 'create-account',
        component: ETeacherCouncilCreateAccountComponent,
      },
      {
        path: 'check/:id',
        component: ETeacherCouncilDetailComponent,
      },
      {
        path: 'check-confirm/:id',
        component: ETeacherCouncilCheckComponent,
      },
      {
        path: 'check-list',
        component: ETeacherCouncilCheckListComponent,
      },
      {
        path: 'declare',
        component: ETeacherCouncilDeclareComponent,
      },
      {
        path: 'create-declare',
        component: ETeacherCouncilCreateDeclareComponent,
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
    EServiceRewardSearchComponent,
    ThaiDatePipe,
    LicenseCheckComponent,
    ValidateKspRequestComponent,
    MatPaginatorModule,
    RequestNoPipe,
    MatDatepickerModule,
    EServiceUiRewardRejectFormModule,
    RewardValidateRequestComponent,
    MatProgressSpinnerModule,
    EServiceRewardAccountSearchComponent,
    EServiceRewardRequestSearchComponent,
    EServiceRewardDeclareSearchComponent,
    EServiceRewardCreateDeclareSearchComponent,
  ],
  declarations: [
    ETeacherCouncilListComponent,
    ETeacherCouncilDetailComponent,
    ETeacherCouncilConfirmComponent,
    ETeacherCouncilRejectComponent,
    ETeacherCouncilAccountListComponent,
    ETeacherCouncilCreateAccountComponent,
    ETeacherCouncilCheckComponent,
    ETeacherCouncilCheckListComponent,
    ETeacherCouncilDeclareComponent,
    ETeacherCouncilCreateDeclareComponent,
  ],
  exports: [ETeacherCouncilListComponent, ETeacherCouncilDetailComponent],
})
export class EServiceProfessionalTeacherCouncilRewardModule {}
