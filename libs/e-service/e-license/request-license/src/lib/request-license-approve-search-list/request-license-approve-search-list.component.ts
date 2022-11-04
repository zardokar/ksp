import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ksp-request-license-approve-search-list',
  templateUrl: './request-license-approve-search-list.component.html',
  styleUrls: ['./request-license-approve-search-list.component.scss'],
})
export class RequestLicenseApproveSearchListComponent implements OnInit {
  displayedColumns = [
    'select',
    'resolution',
    'resolution2',
    'account',
    'count',
    'licenseType',
    'licenseGroup',
    'process',
    'status',
    'screenDate',
    'guaranteeDate',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = [
      {
        select: true,
        resolution: '01/2564',
        resolution2: '01/2564',

        account: '7020',
        count: 100,
        licenseType: 'ครู',
        licenseGroup: 'ชาวไทย',
        process: 'จัดทำกลุ่มบัญชีรายชื่อ',
        status: 'ระหว่างดำเนินการ',
        screenDate: '01 มิ.ย. 2564',
        guaranteeDate: '01 มิ.ย. 2564',
      },
      {
        select: true,
        resolution: '01/2564',
        resolution2: '01/2564',

        account: '7020',
        count: 100,
        licenseType: 'ผู้บริหารสถานศึกษา',
        licenseGroup: 'ชาวไทย',
        process: 'จัดทำกลุ่มบัญชีรายชื่อ',
        status: 'เรียบร้อยแล้ว',
        screenDate: '01 มิ.ย. 2564',
        guaranteeDate: '01 มิ.ย. 2564',
      },
    ];
  }
}