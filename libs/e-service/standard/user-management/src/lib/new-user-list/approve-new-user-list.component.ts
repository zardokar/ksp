import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspPaginationComponent,
  KspRequest,
  ListData,
  RequestSearchFilter,
  SchoolUserPageType,
} from '@ksp/shared/interface';
import { ERequestService, EUniService, LoaderService, UniInfoService } from '@ksp/shared/service';
import {
  checkStatus,
  replaceEmptyWithNull,
  schoolMapRequestType,
} from '@ksp/shared/utility';
import _ from 'lodash';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './approve-new-user-list.component.html',
  styleUrls: ['./approve-new-user-list.component.scss'],
})
export class ApproveNewUserListComponent extends KspPaginationComponent {
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  checkStatus = checkStatus;
  statusList = SchoolRequestProcess.find((i) => i.requestType === 1)?.status;
  mapRequestType = schoolMapRequestType;
  searchType = "uni"
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  selectedUniversity = '';
  uniUniversityTypeOption: ListData[] = [];
  payload: any;

  constructor(
    private router: Router,
    private eRequestService: ERequestService,
    private uniInfoService: UniInfoService,
    private eUniService: EUniService,
    private loaderService: LoaderService
  ) {
    super();
    this.getOptions();
  }

  getOptions() {
    this.uniInfoService.getUniversityType().subscribe(response=>{
      if (response) {
        this.uniUniversityTypeOption = response;
      }
    })
  }

  handleSearch(params: RequestSearchFilter) {
    if (params.requestdatefrom) {
      const newdate = new Date(params.requestdatefrom);
      newdate.setHours(newdate.getHours() + 7);
      params.requestdatefrom = newdate.toISOString();
    }
    this.payload = {
      systemtype: '3',
      requesttype: params.requesttype,
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: null,
      passportno: null,
      process: null,
      status: params.requeststatus,
      unicode: params.schoolinfo?.schoolid,
      uniname: params.schoolinfo?.schoolname,
      unitype: params.schoolinfo?.bureauid,
      requestdatefrom: params.requestdatefrom,
      requestdateto: null
    };
    this.payload = replaceEmptyWithNull(this.payload);
    this.search();
  }

  override search() {
    this.payload = { ...this.payload, ...this.tableRecord };
    this.eUniService.KspSearchUniRequest(this.payload).subscribe((res: any) => {
      if (res && res.datareturn) {
        this.pageEvent.length = res.countrow;
        this.dataSource.data = res.datareturn.map((data: any) => {
          // data.status = parseInt(data.status);
          data.educationoccupy = JSON.parse(data.educationoccupy);
          console.log(data.educationoccupy)
          data.coordinatorinfo = JSON.parse(data.coordinatorinfo);
          data.coordinatorname = data.coordinatorinfo?.firstnameth.concat(" ", data.coordinatorinfo?.lastnameth);
          data.requesttype = parseInt(data.requesttype);
          return data;
        });
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.dataSource.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
  }

  goToDetail(id: number) {
    this.router.navigate(['uni', 'user-detail', id], {
      queryParams: { type: SchoolUserPageType.NewUser },
    });
  }
}

export const column: string[] = [
  'id',
  'view',
  'requestno',
  'name',
  'contactphone',
  'coordinatorname',
  'schoolname',
  //'provience',
  'requestType',
  'requeststatus',
  'requestdate',
];
