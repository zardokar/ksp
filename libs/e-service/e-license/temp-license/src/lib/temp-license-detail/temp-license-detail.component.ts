import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './temp-license-detail.component.html',
  styleUrls: ['./temp-license-detail.component.scss'],
})
export class TempLicenseDetailComponent implements OnInit {
  reason: string[][] = [];
  title: string[] = [];
  selectedTabIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];

    this.reason[0] = [
      'เลขบัตรประชาชนไม่ถูกต้อง',
      'คำนำหน้าไม่ถูกต้อง',
      'ชื่อภาษาไทยไม่ถูกต้อง',
      'ชื่อภาษาอังกฤษไม่ถูกต้อง',
      'นามสกุลภาษาไทยไม่ถูกต้อง',
      'นามสกุลภาษาอังกฤษไม่ถูกต้อง',
      'อื่นๆ (ระบุ)',
    ];
    this.reason[2] = [
      'ชื่อปริญญา/หลักสูตรไม่ถูกต้อง',
      'สาขา/วิชาเอกไม่ถูกต้อง',
      'สถาบันการศึกษาไม่ถูกต้อง',
      'ประเทศไม่ถูกต้อง',
      'วันเดือนปี เข้าศึกษาไม่ถูกต้อง',
      'วันเดือนปี สำเร็จการศึกษาไม่ถูกต้อง',
      'อื่นๆ (ระบุ)',
    ];
    this.reason[3] = [
      'ระบุชื่อวิชาไม่ตรงกับตารางสอน',
      'ระบุช่วงชั้นที่สอนไม่ตรงกับตารางสอน',
      'ระบุตำแหน่งไม่ถูกต้องตามสัญญาจ้าง',
      'ระบุเลขที่สัญญาจ้างไม่ถูกต้อง',
      'ระบุวันเริ่มปฏิบัติงานไม่ถูกต้อง',
      'ระบุวันสิ้นสุดการปฏิบัติงานไม่ถูกต้อง',
      'ระบุระยะเวลาปีที่จ้างไม่ถูกต้อง',
      'ระบุระยะเวลาเดือนที่จ้างไม่ถูกต้อง',
      'อื่นๆ (ระบุ)',
    ];
    this.reason[4] = [
      'ไม่ชี้แจงเหตุผลความจำเป็นของสถานศึกษาที่ต้องรับผู้ไม่มีใบอนุญาตประกอบวิชาชีพ',
      'ไม่ชี้แจงเหตุผลที่ไม่สามารถพัฒนาตนเองได้ตามระยะเวลาที่คุรุสภากำหนด',
      'ขอเอกสารการพํฒนาตนเองเพิ่ม',
      'อื่นๆ (ระบุ)',
    ];
  }

  cancel() {
    this.router.navigate(['/', 'temp-license']);
  }

  next() {
    this.router.navigate(['/', 'temp-license', 'forbidden']);
  }

  prevPage() {
    this.router.navigate(['/', 'temp-license', 'list']);
  }

  tabChanged(e: MatTabChangeEvent) {
    console.log('tab index = ', e.index);
    this.selectedTabIndex = e.index
  }
}
