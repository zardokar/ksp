import { Component } from '@angular/core';
import { UntilDestroy} from '@ngneat/until-destroy';
import {DomSanitizer, SafeResourceUrl}  from '@angular/platform-browser';

import { ActivatedRoute }               from '@angular/router';
// ---------------------------------------------------------------------------
@UntilDestroy()
@Component({
  selector: 'ksp-uni-admission-report'
  ,templateUrl: './uni-admission-report.component.html'
  ,styleUrls: ['./uni-admission-report.component.scss']
})

// ---------------------------------------------------------------------------
export class UniAdmissionReportComponent {
    target_url : SafeResourceUrl  = ''
    target_label                  = ''
  

}

