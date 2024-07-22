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
                      "จำนวน"
]
// --------------------------------------------------------------------------------------------------------------------------
@Component({
    templateUrl: './ethicsreport-resultstat.component.html',
    styleUrls: ['./ethicsreport-resultstat.component.scss'],
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

export class EthicsReportResultStatisticComponent {

  HEAD_LABEL : string         = 'รายงานสถิติผลการพิจารณาและผลคำวินิจฉัย'
  REPORT_COLS_DATA : string[] = REPORT_COLS
  TABLE_STYLE : any           = {
                                  'width' : 'max-content'
                                }

  reportdata : any[any]       = [
    { title: 'กรณี 13/1 ไม่ร้ายแรง วินิจฉัยโทษตักเตือน', count: '10'},
    { title: 'กรณี 13/1 ไม่ร้ายแรง วินิจฉัยโทษภาคทัณฑ์', count: '10'},
    { title: 'กรณี 60/5 ไม่ร้ายแรง วินิจฉัยโทษตักเตือน', count: '10'},
    { title: 'กรณี 60/5 ไม่ร้ายแรง วินิจฉัยโทษภาคทัณฑ์', count: '10'},
    { title: 'กรณี 60/6 ร้ายแรง วินิจฉัยโทษพักใช้', count: '10'},
    { title: 'กรณี 60/6 ร้ายแรง วินิจฉัยโทษเพิกถอน', count: '10'},
    { title: 'ไม่รับเรื่องพิจารณาและจำหน่ายออก เนื่องจากอายุความเกิน 1 ปี', count: '10'},
    { title: 'ยกข้อกล่าวหา/กล่าวโทษ', count: '10'},
    { title: 'ตักเตือน', count: '10'},
    { title: 'ภาคทัณฑ์', count: '10'},
    { title: 'พักใช้', count: '10'},
    { title: 'เพิกถอนหนังสืออนุญาตประกอบวิชาชีพ', count: '10'},
    { title: 'มติคณะกรรมการอื่นๆ', count: '10'},
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
  {}

  onClickSearch() {

  }
  clear() {
  
  }
}