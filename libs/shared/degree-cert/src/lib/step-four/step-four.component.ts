import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import {
  UPLOAD_FILE_1,
  UPLOAD_FILE_2,
  UPLOAD_FILE_3,
  UPLOAD_FILE_4,
  UPLOAD_FILE_5,
} from '@ksp/shared/constant';
@Component({
  selector: 'ksp-degree-cert-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css'],
  providers: providerFactory(DegreeCertStepFourComponent),
})
export class DegreeCertStepFourComponent
  extends KspFormBaseComponent
  implements OnInit, OnChanges
{
  @Input() formType = 'a';
  @Input() systemType = '';
  @Input() step4Incorrect = [];
  @Input() submode = 'create';
  // step4Incorrect = [
  //   'ไม่ครบถ้วน และไม่ถูกต้อง',
  //   'หมายเหตุ สำเนาหนังสืออนุญาตไม่ถูกต้อง',
  // ];
  uniqueTimestamp = '';
  firstChange = true;
  override form = this.fb.group({
    files: [],
  });
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  private _uploadFilesCollection: any = {
    a: this.genUnique(UPLOAD_FILE_1),
    b: this.genUnique(UPLOAD_FILE_2),
    c: this.genUnique(UPLOAD_FILE_3),
    d: this.genUnique(UPLOAD_FILE_4),
    e: this.genUnique(UPLOAD_FILE_5),
  };
  get uploadFilesCollection() {
    return this._uploadFilesCollection;
  }
  genUnique(arr: any) {
    return arr.map((data: any) => ({
      ...data,
      uniqueTimestamp: uuidv4(),
    }));
  }
  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
  }
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  override writeValue(value: any) {
    if (value?.files?.length) {
      this.value = value;
    } else {
      this.value = {
        files: this.uploadFilesCollection[this.formType || 'a'],
      };
    }
  }

  override ngOnChanges(event: any) {
    if ((event?.formType && event?.formType.currentValue != '') && this.firstChange) {
      this.firstChange = false;
    }
    if (event?.mode) {
      this.mode = event.mode.currentValue;
    }
    if (event?.formType && !this.firstChange) {
      this.value = {
        files: this.uploadFilesCollection[this.formType || 'a'],
      };
    }
  }
  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : 10 ตุลาคม 2565
        เลขที่แบบคำขอ : 12234467876543 `,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วัน`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert']);
      }
    });
  }
  uploadComplete(groups: any) {
    this.onChange({
      files: groups,
    });
    this.onTouched();
  }
}
