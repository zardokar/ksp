import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { decisions, KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'e-service-form-investigation-detail',
  templateUrl: './form-investigation-detail.component.html',
  styleUrls: ['./form-investigation-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
  ],
  providers: providerFactory(FormInvestigationDetailComponent),
})
export class FormInvestigationDetailComponent extends KspFormBaseComponent {
  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;
  today = thaiDate(new Date());
  requestNumber = '';
  override form = this.fb.group({
    investigationorderno: [],
    investigationorderdate: [],
    investigationsubcommittee: [],
    investigationdate: [],
    investigationreportdate: [],
    investigationreport: [],
    investigationfile: [],
    investigationresult: this.fb.group({
      decisions: [],
      causedetail: [],
    }),
  });

  decisions = decisions;

  constructor(private router: Router, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
