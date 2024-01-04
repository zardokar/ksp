import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TopNavComponent } from '@ksp/shared/menu';
import { LoaderService } from '@ksp/shared/service';
// --------------------------------------------------------------------------------------------------------------------------
@Component({
    templateUrl: './ethicsreport-recordingstat.component.html',
    styleUrls: ['./ethicsreport-recordingstat.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatProgressSpinnerModule,
      TopNavComponent
    ],
})
// --------------------------------------------------------------------------------------------------------------------------
export class EthicsReportRecordingStatisticComponent {
  HEAD_LABEL : string = 'รายงานสถิติการบันทึกข้อมูลจรรยาบรรณ (ขั้นตอน)'
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
              public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private loaderService: LoaderService
  )
  {}
}