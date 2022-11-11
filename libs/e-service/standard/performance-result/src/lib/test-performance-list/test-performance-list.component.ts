import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { EUniService, UniInfoService } from '@ksp/shared/service';
import { parseJson, stringToThaiDate } from '@ksp/shared/utility';
import { map } from 'rxjs';

@Component({
  selector: 'ksp-test-performance-list',
  templateUrl: './test-performance-list.component.html',
  styleUrls: ['./test-performance-list.component.scss'],
})
export class TestPerformanceListComponent extends KspPaginationComponent implements OnInit {
  displayedColumns1: string[] = column1;
  dataSource1 = new MatTableDataSource<course>();

  displayedColumns2: string[] = column2;
  universityList: ListData[] = [];
  universityTypeList: ListData[] = [];
  degreeLevelList: ListData[] = [];
  rowSelected: any;
  dataSource2 = new MatTableDataSource<student>();
  form = this.fb.group({
    uniid: [null],
    unitype: [null],
    degreeapprovecode: [''],
    degreelevel: [null],
    calendaryear: [''],
    fulldegreename: ['']
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eUniservice: EUniService,
    private uniInfoService: UniInfoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions() {
    this.uniInfoService.getUniDegreelevel().pipe(
      map((res) => {
        return res?.datareturn?.map(({ id, name }: any) => ({
          value: id,
          label: name,
        }));
      })
    )
    .subscribe((data) => {
      this.degreeLevelList = data;
    });
    this.uniInfoService.getUniversityType().pipe(
      map((res) => {
        return res?.map(({ id, name }: any) => ({
          value: id,
          label: name,
        }));
      })
    )
    .subscribe((data) => {
      this.universityTypeList = data;
    });
  }

  save() {
    this.router.navigate(['/', 'import-performance', 'detail', this.rowSelected.id]);
  }

  getRequest() {
    return {
      ...this.form.getRawValue(),
      ...this.tableRecord
    }
  }

  override search() {
    this.eUniservice.getDegreeCertResultList(this.getRequest()).subscribe(res => {
      if (res) {
        this.dataSource1.data = res.datareturn.map((data :any) => {
          const findType = this.universityTypeList.find(type => { return data.unitype == type.value });
          data.unitypename = findType ? findType.label : '';
          data.createdate = data.createdate ? stringToThaiDate(data.createdate) : '';
          return data;
        });
      }
    })
  }

  clear() {
    this.dataSource1.data = [];
    this.dataSource2.data = [];
  }

  selectRow(row: any) {
    this.rowSelected = row;
    this.dataSource2 = row.studentlist ? JSON.parse(row.studentlist) : [];
    console.log(this.dataSource2)
  }

  getFullName(element: any) {
    return [element?.prefixth, element?.firstnameth, element?.lastnameth]
      .filter((d: any) => d)
      .join(' ');
  }
}

export const column1 = [
  'university',
  'faculty',
  'degreeCode',
  'degreeName',
  'branch',
  'year',
  'importDate',
  'status',
];

export const column2 = [
  'personId',
  'name',
  'faculty',
  'branch',
  'year',
  'importDate',
  'status',
];

export interface course {
  university: string;
  faculty: string;
  degreeCode: string;
  degreeName: string;
  branch: string;
  year: string;
  importDate: string;
  status: string;
}

export interface student {
  personId: string;
  name: string;
  faculty: string;
  branch: string;
  year: string;
  importDate: string;
  status: string;
}

export const courseData: course[] = [
  {
    university: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    faculty: 'วิทยาศาสตร์',
    degreeCode: '069784',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์พื้นฐาน',
    year: '2564',
    importDate: '12 ส.ค. 2564 (ครั้งที่ 1)',
    status: 'สำเร็จ',
  },
];

export const studentData: student[] = [
  {
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    faculty: 'ครุศาสตร์',
    branch: 'สาขาวิชาภาษาอังกฤษ',
    year: '2564',
    importDate: '10 มิ.ย. 2566',
    status: 'สำเร็จ',
  },
];
