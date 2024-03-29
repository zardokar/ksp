import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-e-fee-refund-roster-detail',
  templateUrl: './e-fee-refund-roster-detail.component.html',
  styleUrls: ['./e-fee-refund-roster-detail.component.scss'],
})
export class EFeeRefundRosterDetailComponent implements OnInit {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<refundConfirmInfo>();

  constructor(private router: Router) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  cancel() {
    this.router.navigate(['/refund-fee', 'create-roster']);
  }

  ngOnInit(): void {}
}

interface refundConfirmInfo {
  no: number;
  order: string;
  ssn: string;
  name: string;
  feeType: string;
  profession: string;
  reason: string;
  process: string;
  status: string;
  submitDate: string;
}

const data: refundConfirmInfo[] = [
  {
    no: 1,
    order: 'SF_TR6406000001',
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายประหยัด จันทร์อังคาร',
    feeType: 'ขึ้นทะเบียน',
    profession: 'ครู',
    reason: 'ขอยกเลิกการขึ้นทะเบียนรับหนังสืออนุญาต',
    process: 'ตรวจสอบ',
    status: 'เสร็จสิ้น',
    submitDate: '01 มิ.ย.2564',
  },
];

const column = [
  'select',
  'no',
  'order',
  'ssn',
  'name',
  'feeType',
  'profession',
  'reason',
  'process',
  'status',
  'submitDate',
];
