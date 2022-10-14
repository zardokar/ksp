/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspPaginationComponent } from '@ksp/shared/interface';
import { UniInfoService } from '@ksp/shared/service';
import { stringToThaiDate, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-foreign-student-list',
  templateUrl: './foreign-student-list.component.html',
  styleUrls: ['./foreign-student-list.component.scss'],
})
export class ForeignStudentListComponent
  extends KspPaginationComponent
  implements OnInit
{
  dataSource = [];
  displayedColumns = displayedColumns;
  form = this.fb.group({
    search: [{}],
  });
  constructor(private uniInfoService: UniInfoService, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {}
  override search() {
    const { requestdatefrom, requestdateto, name, requestno, passportno } = this
      .form.value.search as any;
    this.uniInfoService
      .kspRequestSearchUni({
        requestdatefrom: requestdatefrom || '',
        requestdateto: requestdateto || '',
        name: name || '',
        requestno: requestno || '',
        passportno: passportno || '',
        ...this.tableRecord,
      })
      .subscribe((res) => {
        if (!res?.datareturn) return;
        this.pageEvent.length = res.countrow;
        this.dataSource = res?.datareturn?.map((item: any, index: number) => {
          return {
            key: item?.id,
            order: this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
            requestNo: item?.requestno,
            passportNo:  item?.passportno,
            accountName: [item?.firstnameth,item?.lastnameth].filter((d)=>d).join(" "),
            process: '',
            status: '',
            updateData: item?.updatedata ? thaiDate(new Date(item?.updatedata)):"",
            requestDate: item?.requestdate ? thaiDate(new Date(item?.requestdate)):"",
          };
        });
      });
  }
  clear() {
    this.form.reset();
  }
}

const displayedColumns: string[] = [
  'order',
  'requestNo',
  'passportNo',
  'accountName',
  'process',
  'status',
  'updateData',
  'requestDate',
  'download',
  'view',
];
