import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface DegreeCertInfo {
  order: number;
  degreeId: string;
  date: string;
  uni: string;
  major: string;
  verifyStatus: string;
  considerStatus: string;
  approveStatus: string;
  approveDate: string;
  editDate: string;
  verify: string;
  consider: string;
}

export const data: DegreeCertInfo[] = [
  {
    order: 1,
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'ตรวจสอบแล้ว',
  },
  {
    order: 2,
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'ตรวจสอบแล้ว',
  },
  {
    order: 3,
    degreeId: 'UNI_VC_64120009',
    date: '10 ธ.ค. 2564',
    uni: 'มหาวิทยาลัยภูเก็ต',
    major: 'คุรุศาสตร์',
    verifyStatus: 'รับข้อมูล',
    considerStatus: 'พิจารณา',
    approveStatus: 'พิจารณา',
    approveDate: '30 ส.ค. 2564',
    editDate: '30 ส.ค. 2564',
    verify: 'ตรวจสอบแล้ว',
    consider: 'ตรวจสอบแล้ว',
  },
];

@Component({
  selector: 'ksp-degree-cert-home',
  templateUrl: './degree-cert-home.component.html',
  styleUrls: ['./degree-cert-home.component.css'],
})
export class DegreeCertHomeComponent {
  data: DegreeCertInfo[] = [];
  constructor(private router: Router) {}

  goToStep1() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }

  search() {
    this.data = data;
  }

  clear() {
    this.data = [];
  }
}