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
const REPORT_COLS = [
  "วันเดือนปีที่บันทึก",
  "บันทึกการกล่าวหา/กล่าวโทษ",
  "สืบสวนข้อเท็จจริง",
  "การสอบสวน",
  "การเผยแพร่การกล่าวหา/กล่าวโทษ",
]
// --------------------------------------------------------------------------------------------------------------------------
@Component({
    templateUrl: './ethicsreport-recordingstat.component.html',
    styleUrls: ['./ethicsreport-recordingstat.component.scss'],
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
export class EthicsReportRecordingStatisticComponent implements OnInit
{

  HEAD_LABEL : string         = 'รายงานสถิติการบันทึกข้อมูลจรรยาบรรณ (ขั้นตอน)'

  REPORT_COLS_DATA : string[] = REPORT_COLS
  TABLE_STYLE : any           = {
                                  'width' : 'max-content'
                                }

  reportdata : any[any]       = [
    { create_date :'1 ต.ค. 2566' , record_count: '10', investigative_count: '8', examinative_count: '2', publish_count: '4' },
    { create_date :'2 ต.ค. 2566' , record_count: '10', investigative_count: '8', examinative_count: '2', publish_count: '4' },
    { create_date :'3 ต.ค. 2566' , record_count: '10', investigative_count: '8', examinative_count: '2', publish_count: '4' },
    { create_date :'4 ต.ค. 2566' , record_count: '10', investigative_count: '8', examinative_count: '2', publish_count: '4' },
    { create_date :'5 ต.ค. 2566' , record_count: '10', investigative_count: '8', examinative_count: '2', publish_count: '4' },
    { create_date :'6 ต.ค. 2566' , record_count: '10', investigative_count: '8', examinative_count: '2', publish_count: '4' },
  ]

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  form = this.fb.group({
    accusation_type: [],
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

  ngOnInit(): void {

  }

  clear() {
  
  }
  onClickSearch() {
    
  }
}