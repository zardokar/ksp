import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode } from '@ksp/shared/interface';
import { GeneralInfoService, RequestService } from '@ksp/shared/service';
import { EMPTY, Observable, switchMap } from 'rxjs';
import localForage from 'localforage';
import { thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
@Component({
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss'],
})
export class CoordinatorInfoComponent implements OnInit {
  form = this.fb.group({
    coordinator: [],
  });
  savingData: any;
  uploadFileList = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      fileId: '',
    },
    {
      name: 'สำเนาบัตรประชาชน',
      fileId: '',
    },
  ];
  requestDate = thaiDate(new Date());
  requestNumber = '';

  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  mode: FormMode = 'edit';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  school: any;
  uniqueTimestamp: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    //this.savingData = history.state.data;

    this.getListData();

    localForage.getItem('registerSelectedSchool').then((res) => {
      this.school = res;
    });

    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.savingData = res;
    });

    this.uniqueTimestamp = uuidv4();
  }
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
  }

  cancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }

  back() {
    this.router.navigate(['register', 'requester']);
  }

  save() {
    localForage.setItem('registerCoordinatorInfoFormValue', this.form.value);
    this.router.navigate(['/register', 'password']);
  }
}
