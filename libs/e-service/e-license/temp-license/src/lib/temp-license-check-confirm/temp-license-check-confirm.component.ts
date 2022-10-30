import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { approveResult } from '@ksp/e-service/e-license/approve-ksp-request';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { KspApprovePayload } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import localForage from 'localforage';
import { KspApprovePersistData } from '../e-temp-license-detail/e-temp-license-detail.component';
import { Location } from '@angular/common';
import { getCookie } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'e-service-temp-license-check-confirm',
  templateUrl: './temp-license-check-confirm.component.html',
  styleUrls: ['./temp-license-check-confirm.component.scss'],
})
export class TempLicenseCheckConfirmComponent implements OnInit {
  requestId!: number;
  saveData = new KspApprovePersistData();
  targetProcess!: number | null;
  targetStatus!: number | null;
  userId = `${getCookie('userId')}`;

  form = this.fb.group({
    approvement: [],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      console.log(res.approvement);
    });

    localForage.getItem('checkRequestData').then((res: any) => {
      this.saveData = res;
      if (this.saveData.requestData.id)
        this.getApproveHistory(this.saveData.requestData.id);
      //console.log('save data = ', this.saveData);
    });
    this.checkRequestId();
  }

  checkApproveResult(input: approveResult) {
    const req = this.saveData.requestData;
    if (input.result === '1') {
      //ครบถ้วน และถูกต้อง
      if (input.shouldForward === '1') {
        //ไม่ส่งตรวจสอบลำดับต่อไป
        if (req.process === '2') {
          this.targetProcess = Number(req.process) + 1;
        } else {
          this.targetProcess = Number(req.process);
        }
        this.targetStatus = 3;
      } else if (input.shouldForward === '2') {
        //ส่งตรวจสอบลำดับต่อไป
        this.targetProcess = Number(req.process) + 1;
        this.targetStatus = 1;
      } else if (input.shouldForward === '4') {
        //ส่งเรื่องพิจารณา
        this.targetProcess = 5;
        this.targetStatus = 1;
      }
    } else if (input.result === '2') {
      //ขอแก้ไข / เพิ่มเติม
      this.targetProcess = Number(req.process) + 1;
      this.targetStatus = 2;
    } else if (input.result === '3') {
      if (req.process === '2') {
        this.targetProcess = Number(req.process) + 1;
      } else {
        this.targetProcess = Number(req.process);
      }
      if (input.shouldForward === '3') {
        //ไม่ผ่านการตรวจสอบ เนื่องจากไม่ครบถ้วน / ไม่ถูกต้อง
        this.targetStatus = 4;
      } else if (input.shouldForward === '5') {
        //ยกเลิก
        this.targetStatus = 5;
      }
    }
  }

  checkRequest() {
    this.checkApproveResult(<any>this.form.value.approvement);
    //console.log('save data = ', this.saveData);
    const form: any = this.form.controls.approvement.value;
    //console.log('form = ', form);
    const detail = {
      returndate: form.returndate,
      reason: form.reason,
      checkresult: this.saveData.checkDetail,
    };

    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: `${this.targetProcess}`,
      status: `${this.targetStatus}`,
      detail: JSON.stringify(detail),
      systemtype: '2', // school
      userid: this.userId,
      paymentstatus: null,
    };

    console.log('payload = ', payload);

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      this.completeDialog();
    });
  }

  considerRequest() {
    //console.log('consider request  = ');
    const form: any = this.form.value.approvement;
    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: '5',
      status: `${form.result}`,
      detail: JSON.stringify(this.saveData.checkDetail),
      systemtype: '2',
      userid: this.userId,
      paymentstatus: null,
    };

    console.log('payload = ', payload);

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      this.completeDialog();
    });
  }

  getApproveHistory(requestid: string) {
    this.eRequestService.getApproveHistory(requestid).subscribe((res) => {
      console.log('list = ', res);
    });
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
    });
  }

  navigateBack() {
    if (this.saveData.requestData.requesttype === '6') {
      this.router.navigate(['/qualification-approve', 'list']);
    } else {
      this.router.navigate(['/temp-license', 'list']);
    }
  }

  prevPage() {
    //this.router.navigate(['/temp-license', 'detail', this.requestId]);
    this.location.back();
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        if (this.saveData.requestData.process === '5') {
          this.considerRequest();
        } else {
          this.checkRequest();
        }
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
}
