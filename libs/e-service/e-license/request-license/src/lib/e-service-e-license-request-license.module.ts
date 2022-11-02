import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestLicenseApproveListComponent } from './request-license-approve-list/request-license-approve-list.component';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import {
  EServiceLicenseSearchComponent,
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { RequestLicenseApproveDetailComponent } from './request-license-approve-detail/request-license-approve-detail.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { RequestLicenseApproveConfirmComponent } from './request-license-approve-confirm/request-license-approve-confirm.component';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';

export const routes: Route[] = [
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
        path: 'approve-list',
        component: RequestLicenseApproveListComponent,
      },
      {
        path: 'approve-detail',
        component: RequestLicenseApproveDetailComponent,
      },
      {
        path: 'approve-detail/:id',
        component: RequestLicenseApproveDetailComponent,
      },
      {
        path: 'approve-confirm/:id',
        component: RequestLicenseApproveConfirmComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    SelfServiceFormModule,
    SharedFormOthersModule,
    MatTabsModule,
    FormUploadImageComponent,
    ReactiveFormsModule,
    BottomNavComponent,
    LicenseCheckComponent,
    RequestHeaderInfoComponent,
    EServiceRequestSearchComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RequestSearchComponent,
    ThaiDatePipe,
    EServiceLicenseSearchComponent,
    ValidateKspRequestComponent,
  ],
  declarations: [
    RequestLicenseApproveListComponent,
    RequestLicenseApproveDetailComponent,
    RequestLicenseApproveConfirmComponent,
  ],
})
export class EServiceELicenseRequestLicenseModule {}
