import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterCoordinatorInfoComponent } from './form-register-coordinator/form-register-coordinator.component';
import { FormRegisterRequesterInfoComponent } from './form-register-requester/form-register-requester.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UniFormSearchUniReportComponent } from './form-search-unireport/form-search-unireport.component';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    DropdownModule],
  declarations: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    UniFormSearchUniReportComponent,
  ],
  exports: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    UniFormSearchUniReportComponent,
  ],
})
export class UniServiceFormModule {}
