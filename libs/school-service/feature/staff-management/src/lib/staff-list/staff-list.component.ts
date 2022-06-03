import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface staffInfo {
  order: number;
  ssn: string;
  name: string;
  startDate: string;
  endDate: string;
  profession: string;
  teaching: string;
  tempLicense: string;
  edit: string;
  view: string;
}

export const data: staffInfo[] = [
  {
    order: 1,
    ssn: 'x-xxxx-xxxx-xx-x',
    name: 'นายธนารักษ์ ใจสะอาด',
    startDate: 'วว/ดด/ปปปป',
    endDate: 'วว/ดด/ปปปป',
    profession: '',
    teaching: '',
    tempLicense: '',
    edit: '',
    view: '',
  },
];

@Component({
  selector: 'school-service-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent {
  personSelected = false;
  displayedColumns: string[] = [
    'order',
    'ssn',
    'name',
    'startDate',
    'endDate',
    'profession',
    'teaching',
    'tempLicense',
    'edit',
    'view',
  ];
  dataSource = new MatTableDataSource<staffInfo>();

  constructor(private router: Router) {}

  //onItemChange(universityCode: string) {}

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail() {
    this.router.navigate(['./', 'staff-management', 'license-search']);
  }

  addStaff() {
    this.router.navigate(['./', 'staff-management', 'staff-person-info']);
  }
}