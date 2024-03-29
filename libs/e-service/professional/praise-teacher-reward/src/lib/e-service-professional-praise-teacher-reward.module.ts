import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EPraiseTeacherListComponent } from './e-praise-teacher-list/e-praise-teacher-list.component';
import { EPraiseTeacherDetailComponent } from './e-praise-teacher-detail/e-praise-teacher-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import {
  EServiceRewardAccountSearchComponent,
  EServiceRewardCreateDeclareSearchComponent,
  EServiceRewardDeclareSearchComponent,
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
import { EPraiseTeacherConfirmComponent } from './e-praise-teacher-confirm/e-praise-teacher-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EPraiseTeacherRejectComponent } from './e-praise-teacher-reject/e-praise-teacher-reject.component';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EPraiseTeacherAccountListComponent } from './e-praise-teacher-account-list/e-praise-teacher-account-list.component';
import { EPraiseTeacherCreateAccountComponent } from './e-praise-teacher-create-account/e-praise-teacher-create-account.component';
import { EPraiseTeacherCheckListComponent } from './e-praise-teacher-check-list/e-praise-teacher-check-list.component';
import { EPraiseTeacherCheckComponent } from './e-praise-teacher-check/e-praise-teacher-check.component';
import { EPraiseTeacherDeclareComponent } from './e-praise-teacher-declare/e-praise-teacher-declare.component';
import { EPraiseTeacherCreateDeclareComponent } from './e-praise-teacher-create-declare/e-praise-teacher-create-declare.component';

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
        component: EPraiseTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: EPraiseTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EPraiseTeacherConfirmComponent,
      },

      {
        path: 'reject/:id',
        component: EPraiseTeacherRejectComponent,
      },
      {
        path: 'account-list',
        component: EPraiseTeacherAccountListComponent,
      },
      {
        path: 'create-account',
        component: EPraiseTeacherCreateAccountComponent,
      },
      {
        path: 'check/:id',
        component: EPraiseTeacherDetailComponent,
      },
      {
        path: 'check-list',
        component: EPraiseTeacherCheckListComponent,
      },
      {
        path: 'check-confirm/:id',
        component: EPraiseTeacherCheckComponent,
      },
      {
        path: 'declare',
        component: EPraiseTeacherDeclareComponent,
      },
      {
        path: 'create-declare',
        component: EPraiseTeacherCreateDeclareComponent,
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
    EServiceRewardDeclareSearchComponent,
    EServiceRewardCreateDeclareSearchComponent,
  ],
  declarations: [
    EPraiseTeacherListComponent,
    EPraiseTeacherDetailComponent,
    EPraiseTeacherConfirmComponent,
    EPraiseTeacherRejectComponent,
    EPraiseTeacherAccountListComponent,
    EPraiseTeacherCreateAccountComponent,
    EPraiseTeacherCheckListComponent,
    EPraiseTeacherCheckComponent,
    EPraiseTeacherDeclareComponent,
    EPraiseTeacherCreateDeclareComponent,
  ],
  exports: [EPraiseTeacherListComponent, EPraiseTeacherDetailComponent],
})
export class EServiceProfessionalPraiseTeacherRewardModule {}
