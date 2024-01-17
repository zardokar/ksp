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

const REPORT_COLS = [
                      "ลำดับที่",
                      "วันที่รับ",
                      "จรรยาบรรณหมายเลขดำที่",
                      "จรรยาบรรณหมายเลขแดงที่",
                      "ผู้กล่าวหา/กล่าวโทษ",
                      "ผู้ถูกกล่าวหา/กล่าวโทษ",
                      "เลขบัตรประชาชน",
                      "ช่องทางการกล่าวหา/กล่าวโทษ",
                      "ประเภทความผิด",
                      "เรื่อง",
                      "จังหวัด",
                      "ระดับประถม/มัธยม/อาชีวะ",
                      "ต้นสังกัดผู้ถูกกล่าวหา/กล่าวโทษ(ขณะทำความผิด)",
                      "ภาค (เหนือ กลาง อีสาน ใต้)",
                      "โรงเรียนหรือวิทยาลัยหรือศูนย์เด็กเล็ก(ที่เกิดเหตุ)",
                      "ประเภทใบอนุญาต",
                      "สถานะใบอนุญาต (ระบุวันหมดอายุ)",
                      "สถานะปัจจุบันของผู้ถูกกล่าวหา/กล่าวโทษ",
                      "อายุ",
                      "เจ้าของเรื่อง",
                      "วินัย",
                      "ผลการดำเนินคดีอาญา",
                      "คำพิพากษา",	
                      "ปัจจุบันอยู่ระหว่าง",
                      "เลขคำสั่งแต่งตั้งคณะอนุกรรมการสืบสวน",
                      "วันที่แต่งตั้งคณะอนุกรรมการสืบสวน",
                      "ความเห็นคณะกรมการสืบสวนข้อเท็จจริง",
                      "เลขคำสั่งแต่งตั้งคณะอนุกรรมการสอบสวน",
                      "วันที่แต่งตั้งคณะอนุกรรมการสอบสวน",
                      "คำวินิจฉัยคณะกรรมการมาตฐานวิชาชีพ",
                      "วันที่แจ้งคำวินิจฉัยผู้ถูกกล่าวหากล่าวโทษ",
                      "วันที่ผู้ถูกกล่าวหากล่าวโทษแจ้งรับทราบกลับ",
                      "วันที่ส่งเรื่องแจ้งให้สำนักทะเบียนและใบอนุญาต",
                      "วันที่ส่งคืนใบอนุญาตของผู้ถูกกล่าวหากล่าวโทษ",
                      "วันที่อุทธรณ์"

]
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
export class EthicsReportRecordingComponent implements OnInit
{
  HEAD_LABEL : string         = 'รายงานการบันทึกข้อมูลจรรยาบรรณ'
  REPORT_COLS_DATA : string[] = REPORT_COLS
  TABLE_STYLE : any           = {
                                  'width' : 'max-content'
                                }

  reportdata : any[any]       = DUMMY_DATA

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
    // nothing assign in constructor
  }

  ngOnInit(): void {
    
  }

  clear()
  {

  }

  onClickSearch()
  {

  }
}

// --------------------------------------------------------------------------------------------------------------------------
export interface EthicsReportRecord {
  no?: string 
  create_date?: string 
  black_no?: string 
  red_no?: string 
  accuser?: string
  accused?: string
  idcardno?: string
  channels?: string
  accusation_type?: string
  accusation_title?: string
  province?: string
  edu_level?: string
  bureau?: string
  region?: string
  institute?: string
  license_type?: string
  license_status?: string
  accused_status?: string
  age?: string
  accowner?: string
  discipline?: string
  criminal_result?: string
  judgment?: string
  current_state?: string
  order_investigative_no?: string
  subcommittee_invg_appoint_date?: string
  subcommittee_invg_decision?: string
  order_examinative_no?: string
  subcommittee_exat_appoint_date?: string
  subcommittee_exat_decision?: string
  decision_accused_notify_date?: string
  accused_accept_date?: string
  license_dept_sending_date?: string
  return_license_accused_date?: string
  appeal_sending_date?: string
}
// --------------------------------------------------------------------------------------------------------------------------
const EthicsReportRecordDefaultValue : EthicsReportRecord = {
  no: '', 
  create_date: '', 
  black_no: '', 
  red_no: '', 
  accuser: '',
  accused: '',
  idcardno: '',
  channels: '',
  accusation_type: '',
  accusation_title: '',
  province: '',
  edu_level: '',
  bureau: '',
  region: '',
  institute: '',
  license_type: '',
  license_status: '',
  accused_status: '',
  age: '',
  accowner: '',
  discipline: '',
  criminal_result: '',
  judgment: '',
  current_state: '',
  order_investigative_no: '',
  subcommittee_invg_appoint_date: '',
  subcommittee_invg_decision: '',
  order_examinative_no: '',
  subcommittee_exat_appoint_date: '',
  subcommittee_exat_decision: '',
  decision_accused_notify_date: '',
  accused_accept_date: '',
  license_dept_sending_date: '',
  return_license_accused_date: '',
  appeal_sending_date: '',
}

// --------------------------------------------------------------------------------------------------------------------------
const dummy1              = Object.assign({}, EthicsReportRecordDefaultValue) 
const dummy2              = Object.assign({}, EthicsReportRecordDefaultValue)
const dummy3              = Object.assign({}, EthicsReportRecordDefaultValue)

dummy1.no                 = "1"
dummy1.black_no           = "17/2551 (ก)"
dummy1.province           = "กรุงเทพมหานคร"
dummy1.accuser            = "เลขาธิการคุรุสภา"
dummy1.accusation_title   = "ละเมิดสิทธิเด็กและเยาวชน"

dummy2.no                 = "2"
dummy2.black_no           = "152/2551 (ว)"
dummy2.province           = "ปทุมธานี"
dummy2.accuser            = "เลขาธิการคุรุสภา"
dummy2.accusation_title   = "เมาสุราในขณะปฏิบัติราชการ"

dummy3.no                 = "3"
dummy3.black_no           = "17/2551 (ก)"
dummy3.province           = "ปทุมธานี"
dummy3.accuser            = "เลขาธิการคุรุสภา"
dummy3.accusation_title   = "ทุพพลภาพและหย่อนสมรรถภาพ"

const DUMMY_DATA = [ dummy1, dummy2, dummy3 ]
