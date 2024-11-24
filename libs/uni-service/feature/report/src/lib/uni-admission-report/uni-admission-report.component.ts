import { Component }            from '@angular/core';
import { UntilDestroy}          from '@ngneat/until-destroy';

import { REPORT_TYPE } from '@ksp/shared/constant';

// ---------------------------------------------------------------------------
@UntilDestroy()
@Component({
  selector: 'ksp-uni-admission-report'
  ,templateUrl: './uni-admission-report.component.html'
  ,styleUrls: ['./uni-admission-report.component.scss']
})

// ---------------------------------------------------------------------------
export class UniAdmissionReportComponent
{
    report_type   = ''
    
    constructor()
    {
        this.report_type   = REPORT_TYPE['ADMISSION']
    }
}

