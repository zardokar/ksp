import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolServiceUserPageType } from '@ksp/shared/interface';
import { RequestLicenseService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  templateUrl: './manage-current-user-list.component.html',
  styleUrls: ['./manage-current-user-list.component.scss'],
})
export class ManageCurrentUserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    manageSearch: [],
  });

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();

  selectedUniversity = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestLicenseService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  search(params: any) {
    console.log('params = ', params);

    const payload = {
      schoolid: params.institution?.schoolid,
      requestno: params.requestno,
      firstnameth: params.name,
      lastnameth: null,
      requestdate: null,
      requesttype: '1',
      requeststatus: null,
      currentprocess: '5',
      schoolname: null,
      bureauid: null,
      offset: '0',
      row: '10',
    };

    this.requestService.searchRegisterRequest(payload).subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  goToDetail(id: number) {
    this.router.navigate(['/', 'manage-current-user', 'detail', id], {
      queryParams: { type: SchoolServiceUserPageType.ManageCurrentUser },
    });
  }
}

export const column = [
  'id',
  'view',
  'idcardno',
  'name',
  'schoolname',
  //'province',
  'requeststatus',
  'requestdate',
  'updatedate',
];
