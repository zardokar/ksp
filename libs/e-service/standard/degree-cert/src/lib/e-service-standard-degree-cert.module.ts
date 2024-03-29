import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceDegreeCertListComponent } from './list/e-service-degree-cert-list.component';
import { BottomNavComponent } from '@ksp/shared/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedDegreeCertModule } from '@ksp/shared/degree-cert';
import { EServiceUiVerifyResultBoxModule } from '@ksp/e-service/ui/verify-result-box';
import { VerifyComponent } from './verify/verify.component';
import { ConsiderComponent } from './consider/consider.component';
import { ApproveComponent } from './approve/approve.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EServiceStandardDegreeCertRoutingModule } from './e-service-standard-degree-cert-routing.module';
import { CheckComponent } from './check/check.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { MatIconModule } from '@angular/material/icon';
import {
  DegreeCertStatusComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert/step-two';
import { FinalResultComponent } from './final-result/final-result.component';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  FinalResultInfoComponent,
  LicenseCheckComponent,
} from '@ksp/e-service/ui/license-check';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DegreeCertApprovedSearchComponent,
  DegreeCertSearchComponent,
  DegreeSearchComponent,
} from '@ksp/shared/search';
import { RouterModule } from '@angular/router';
import {
  FormApproveMeetingRecordComponent,
  FormFollowUpRecordComponent,
  FormMeetingRecordComponent,
} from '@ksp/e-service/ethics/form';
import { EServiceDegreeCertApprovedListComponent } from './list-approved/e-service-degree-cert-list-approved.component';
import { ImportStudentComponent } from './import-student/import-student.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { TableModule } from 'primeng/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormAddressTableComponent, SharedFormOthersModule } from '@ksp/shared/form/others';
import { ConsiderStudentComponent } from './import-student/consider-student/consider-student.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { EserviceEditStudentListComponent } from './edit-student-list/edit-student-list.component';
import { EserviceEditStudentDetailComponent } from './edit-student-detail/edit-student-detail.component';
import { EditLicenseComponent } from '@ksp/shared/form/license';
import { EServiceDegreeCertListEditComponent } from './list-edit/e-service-degree-cert-list-edit.component';
import { EserviceEditDegreeDetailComponent } from './edit-degree-detail/e-service-edit-degree-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    EServiceUiVerifyResultBoxModule,
    EServiceStandardDegreeCertRoutingModule,
    SharedDegreeCertModule,
    BottomNavComponent,
    SharedFormDegreeCertStepOneModule,
    MatStepperModule,
    MatTabsModule,
    MatIconModule,
    TableModule,
    SharedFormDegreeCertStepTwoModule,
    RequestHeaderInfoComponent,
    TopNavComponent,
    LicenseCheckComponent,
    FinalResultInfoComponent,
    ReactiveFormsModule,
    FormMeetingRecordComponent,
    FormFollowUpRecordComponent,
    DegreeCertSearchComponent,
    DegreeCertApprovedSearchComponent,
    MatDatepickerModule,
    FormAddressTableComponent,
    MatPaginatorModule,
    FormApproveMeetingRecordComponent,
    DegreeCertStatusComponent,
    MatProgressSpinnerModule,
    ThaiDatePipe,
    DegreeSearchComponent,
    EditLicenseComponent,
    SharedFormOthersModule,
    
  ],
  declarations: [
    EServiceDegreeCertListComponent,
    EServiceDegreeCertApprovedListComponent,
    EserviceEditStudentListComponent,
    EserviceEditStudentDetailComponent,
    VerifyComponent,
    ConsiderComponent,
    ApproveComponent,
    CheckComponent,
    FinalResultComponent,
    ImportStudentComponent,
    CourseDetailComponent,
    ConsiderStudentComponent,
    FollowUpComponent,
    EServiceDegreeCertListEditComponent,
    EserviceEditDegreeDetailComponent
  ],
})
export class EServiceStandardDegreeCertModule {}
