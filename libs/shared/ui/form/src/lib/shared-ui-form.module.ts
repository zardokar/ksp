import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddressComponent } from './form-address/form-address.component';
import { FormSchoolAddressComponent } from './form-school-address/form-school-address.component';
import { FormEducationInfoComponent } from './form-education-info/form-education-info.component';
import { FormTeachingInfoComponent } from './form-teaching-info/form-teaching-info.component';
import { FormReasonInfoComponent } from './form-reason-info/form-reason-info.component';
import { FormAttachmentComponent } from './form-attachment/form-attachment.component';
import { FormUserInfoComponent } from './form-user-info/form-user-info.component';
import { FormForeignIdComponent } from './form-foreign-id/form-foreign-id.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormAddressComponent,
    FormSchoolAddressComponent,
    FormEducationInfoComponent,
    FormTeachingInfoComponent,
    FormReasonInfoComponent,
    FormAttachmentComponent,
    FormUserInfoComponent,
    FormForeignIdComponent,
  ],
  exports: [
    FormAddressComponent,
    FormSchoolAddressComponent,
    FormEducationInfoComponent,
    FormTeachingInfoComponent,
    FormReasonInfoComponent,
    FormAttachmentComponent,
    FormUserInfoComponent,
    FormForeignIdComponent,
  ],
})
export class SharedUiFormModule {}
