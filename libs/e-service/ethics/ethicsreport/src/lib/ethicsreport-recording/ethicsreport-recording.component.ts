import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TopNavComponent } from '@ksp/shared/menu';
import { LoaderService } from '@ksp/shared/service';

import { GNXTableComponent } from '@ksp/shared/utility';
// --------------------------------------------------------------------------------------------------------------------------
@Component({
    templateUrl: './ethicsreport-recording.component.html',
    styleUrls: ['./ethicsreport-recording.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatProgressSpinnerModule,
      MatDatepickerModule,
      ReactiveFormsModule,
      TopNavComponent,
      GNXTableComponent
    ],
})
// --------------------------------------------------------------------------------------------------------------------------
export class EthicsReportRecordingComponent 
{
  HEAD_LABEL : string = 'รายงานการบันทึกข้อมูลจรรยาบรรณ'

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  form = this.fb.group({
    black_no: [],
    red_no: [],
    search_id: [],
    license_id: [],
    fromDate: [],
    toDate: []
  });

  constructor(
              public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private loaderService: LoaderService
  )
  {
    
  }

  clear()
  {

  }

  onClickSearch()
  {

  }
}