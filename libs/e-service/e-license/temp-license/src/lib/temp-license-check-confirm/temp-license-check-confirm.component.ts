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
import { checkStatus, getCookie } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'e-service-temp-license-check-confirm',
  templateUrl: './temp-license-check-confirm.component.html',
  styleUrls: ['./temp-license-check-confirm.component.scss'],
})
export class TempLicenseCheckConfirmComponent implements OnInit {
  requestId!: number;
  checkStatus = checkStatus;
  saveData = new KspApprovePersistData();
  targetProcess!: number | null;
  targetStatus!: number | null;
  userId = `${getCookie('userId')}`;
  approveHistory: any[] = [];

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
    //console.log('jjj = ');
    /* this.form.valueChanges.subscribe((res) => {
      console.log(res.approvement);
    }); */
    this.checkRequestId();

    localForage.getItem('checkRequestData').then((res: any) => {
      this.saveData = res;
      //console.log('save data = ', this.saveData);
      if (this.saveData.requestData.id)
        this.getApproveHistory(this.saveData.requestData.id);
    });

    const temp: any = {
      approveNo: '2/2565',
      approveDate: new Date(),
    };
    this.form.controls.approvement.patchValue(temp);
  }

  getApproveHistory(requestid: string) {
    this.eRequestService.getApproveHistory(requestid).subscribe((res) => {
      this.approveHistory = res;
      this.approveHistory = this.approveHistory.map((h: any) => {
        return { ...h, ...{ detail: JSON.parse(h.detail) } };
      });
      //console.log('approve history after= ', this.approveHistory);
    });
  }

  checkApproveResult(input: approveResult) {
    const req = this.saveData.requestData;
    //console.log('check approve = ');
    if (req.requesttype === '3') {
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
          if (req.process === '2') {
            this.targetProcess = 4;
            this.targetStatus = 1;
          } else {
            this.targetProcess = Number(req.process) + 1;
            this.targetStatus = 1;
          }
        } else if (input.shouldForward === '4') {
          //ส่งเรื่องพิจารณา
          this.targetProcess = 5;
          this.targetStatus = 1;
        }
      } else if (input.result === '2') {
        //ขอแก้ไข / เพิ่มเติม
        //console.log('ขอแก้ไข / เพิ่มเติม  req.process =', req.process);
        this.targetProcess = Number(req.process) + 1;
        this.targetStatus = 2;
      } else if (input.result === '3') {
        if (req.process === '2') {
          console.log('a process = ', req.process);
          this.targetProcess = Number(req.process) + 1;
        } else {
          console.log('b process = ', req.process);
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
    } else if (req.requesttype === '6') {
      //console.log('condition for  ใบคำขอรับรองคุณวุฒิ ');
      //ครบถ้วน และถูกต้อง
      if (input.result === '1') {
        if (input.shouldForward === '1') {
          //ไม่ส่งตรวจสอบลำดับต่อไป
          if (req.process === '1') {
            this.targetProcess = 2;
          } else {
            this.targetProcess = Number(req.process);
          }
          this.targetStatus = 3;
        } else if (input.shouldForward === '2' || input.shouldForward === '4') {
          //ส่งตรวจสอบลำดับต่อไป
          this.targetProcess = 3;
          this.targetStatus = 1;
        }
      } else if (input.result === '2') {
        //ขอแก้ไข / เพิ่มเติม
        this.targetProcess = 2;
        this.targetStatus = 2;
      } else if (input.result === '3') {
        //ขาดคุณสมบัติ
        this.targetProcess = 2;
        if (input.shouldForward === '3') {
          //ไม่ผ่านการตรวจสอบ เนื่องจากไม่ครบถ้วน / ไม่ถูกต้อง
          this.targetStatus = 4;
        } else if (input.shouldForward === '5') {
          //ยกเลิก
          this.targetStatus = 5;
        }
      }
    }
  }

  mapCheckResult(result: string) {
    if (result === '1') return 'ครบถ้วน และถูกต้อง';
    if (result === '2') return 'ขอแก้ไข / เพิ่มเติม';
    if (result === '3') return 'ขาดคุณสมบัติ';
    else return '';
  }

  checkRequest() {
    this.checkApproveResult(<any>this.form.value.approvement);
    //console.log('save data = ', this.saveData);
    const form: any = this.form.controls.approvement.value;
    console.log('form  check= ', form);
    const detail = {
      returndate: form.returndate,
      reason: form.reason,
      checkresult: form.result,
      checkdetail: this.saveData.checkDetail,
    };

    const payload: KspApprovePayload = {
      requestid: this.saveData.requestData.id,
      process: `${this.targetProcess}`,
      status: `${this.targetStatus}`,
      detail: JSON.stringify(detail),
      systemtype: '4', // e-service
      userid: this.userId,
      paymentstatus: null,
    };

    //console.log('payload = ', payload);
    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      this.completeDialog();
    });
  }

  considerRequest() {
    //console.log('consider request  = ');
    const req = this.saveData.requestData;
    let considerProcess = '';
    if (req.requesttype === '3') {
      considerProcess = '5';
    } else if (req.requesttype === '6') {
      considerProcess = '3';
    }

    const form: any = this.form.value.approvement;
    const payload: KspApprovePayload = {
      requestid: req.id,
      process: considerProcess,
      status: `${form.result}`,
      detail: JSON.stringify(this.saveData.checkDetail),
      systemtype: '4', // e-service
      userid: this.userId,
      paymentstatus: null,
    };
    //console.log('payload = ', payload);

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      this.completeDialog();
    });
  }

  checkRequestId() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      this.requestId = Number(params.get('id'));
    });
  }

  getLabel() {
    const req = this.saveData.requestData;
    if (req.requesttype === '6') {
      return `ขอรับรองคุณวุฒิการศึกษาเพื่อใช้ในการขอรับใบอนุญาตประกอบวิชาชีพ`;
    } else {
      const message = `ขอหนังสืออนุญาตประกอบวิชาชีพ โดยไม่มีใบอนุญาตประกอบวิชาชีพ`;
      if (req.careertype === '1') {
        return message + 'ครู';
      } else if (req.careertype === '2') {
        return message + 'ผู้บริหารสถานศึกษา';
      } else if (req.careertype === '5') {
        return message + 'ชาวต่างชาติ';
      } else {
        return message;
      }
    }
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
        if (this.saveData.requestData.requesttype === '3') {
          //console.log('ใบคำขอชั่วคราว = ');
          if (this.saveData.requestData.process === '5') {
            this.considerRequest();
          } else {
            this.checkRequest();
          }
        }
        if (this.saveData.requestData.requesttype === '6') {
          //console.log('ใบคำขอรับรองคุณวุฒิ = ');
          if (this.saveData.requestData.process === '3') {
            this.considerRequest();
          } else {
            this.checkRequest();
          }
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
        this.navigateBack();
      }
    });
  }
}
