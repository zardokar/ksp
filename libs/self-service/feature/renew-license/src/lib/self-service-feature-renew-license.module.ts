import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenewLicenseRequestComponent } from './renew-license-request/renew-license-request.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { RenewLicenseSchoolManagerComponent } from './renew-license-school-manager/renew-license-school-manager.component';
import { RenewLicenseEducationManagerComponent } from './renew-license-education-manager/renew-license-education-manager.component';
import { RenewLicenseStudySupervisionComponent } from './renew-license-study-supervision/renew-license-study-supervision.component';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: RenewLicenseRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    FormUploadImageComponent,
    TopNavComponent,
    SelfServiceLicenseInfoComponent,
    SharedFormOthersModule,
    SelfServiceFormModule,
    RequestStatusComponent,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RenewLicenseRequestComponent,
    RenewLicenseSchoolManagerComponent,
    RenewLicenseEducationManagerComponent,
    RenewLicenseStudySupervisionComponent,
  ],
  exports: [
    RenewLicenseRequestComponent,
    RenewLicenseSchoolManagerComponent,
    RenewLicenseEducationManagerComponent,
    RenewLicenseStudySupervisionComponent,
  ],
})
export class SelfServiceFeatureRenewLicenseModule {}