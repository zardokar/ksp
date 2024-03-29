import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LicenseRequestComponent } from './license-request/license-request.component';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { LicenseEditComponent } from './license-edit/license-edit.component';
import {
  BottomNavComponent,
  SharedMenuModule,
  TopNavComponent,
} from '@ksp/shared/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import {
  PaymentChannelComponent,
  PaymentKtbComponent,
  PromptpayComponent,
} from '@ksp/self-service/feature/payment';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { PageNotFoundComponent, UniFormBadgeComponent } from '@ksp/shared/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LicenseRequestSchoolManagerComponent } from './license-request-school-manager/license-request-school-manager.component';
import { LicenseRequestEducationManagerComponent } from './license-request-education-manager/license-request-education-manager.component';
import { LicenseRequestStudySupervisionComponent } from './license-request-study-supervision/license-request-study-supervision.component';
import { LicenseRequestForeignComponent } from './license-request-foreign/license-request-foreign.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LicenseForeignAgreementComponent } from './license-foreign-agreement/license-foreign-agreement.component';
import { EditLicenseComponent } from '@ksp/shared/form/license';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'teacher',
        component: LicenseRequestComponent,
      },
      {
        path: 'teacher/:id',
        component: LicenseRequestComponent,
      },
      {
        path: 'foreign-teacher',
        component: LicenseRequestForeignComponent,
      },
      {
        path: 'foreign-teacher/:id',
        component: LicenseRequestForeignComponent,
      },
      {
        path: 'school-manager',
        component: LicenseRequestSchoolManagerComponent,
      },
      {
        path: 'school-manager/:id',
        component: LicenseRequestSchoolManagerComponent,
      },
      {
        path: 'education-manager',
        component: LicenseRequestEducationManagerComponent,
      },
      {
        path: 'education-manager/:id',
        component: LicenseRequestEducationManagerComponent,
      },
      {
        path: 'study-supervision',
        component: LicenseRequestStudySupervisionComponent,
      },
      {
        path: 'study-supervision/:id',
        component: LicenseRequestStudySupervisionComponent,
      },
      {
        path: 'agreement',
        component: LicenseForeignAgreementComponent,
      },
      {
        path: 'edit',
        component: LicenseEditComponent,
      },
      {
        path: 'edit/:id',
        component: LicenseEditComponent,
      },
      {
        path: 'payment-channel/:id',
        component: PaymentChannelComponent,
      },
      {
        path: 'payment-promptpay/:id',
        component: PromptpayComponent,
      },
      {
        path: 'payment-ktb/:id',
        component: PaymentKtbComponent,
      },
      {
        path: '*',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceFormModule,
    SharedFormOthersModule,
    SharedMenuModule,
    MatTabsModule,
    MatExpansionModule,
    TopNavComponent,
    RouterModule.forChild(routes),
    SelfServiceLicenseInfoComponent,
    BottomNavComponent,
    ReactiveFormsModule,
    FormsModule,
    FormUploadImageComponent,
    MatStepperModule,
    RequestStatusComponent,
    EditLicenseComponent,
    MatProgressSpinnerModule,
    UniFormBadgeComponent,
  ],
  declarations: [
    LicenseRequestComponent,
    LicenseEditComponent,
    LicenseRequestSchoolManagerComponent,
    LicenseRequestEducationManagerComponent,
    LicenseRequestStudySupervisionComponent,
    LicenseRequestForeignComponent,
    LicenseForeignAgreementComponent,
  ],
  exports: [
    LicenseRequestSchoolManagerComponent,
    LicenseRequestEducationManagerComponent,
    LicenseRequestStudySupervisionComponent,
    LicenseRequestForeignComponent,
    LicenseForeignAgreementComponent,
  ],
})
export class SelfServiceFeatureLicenseModule {}
