import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { Ethics } from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import _ from 'lodash';
import {
  jsonParse,
  mapFileInfo,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
@Component({
  selector: 'e-service-accusation-decision',
  templateUrl: './accusation-decision.component.html',
  styleUrls: ['./accusation-decision.component.scss'],
})
export class AccusationDecisionComponent implements OnInit {
  decisions = decisions;
  today = thaiDate(new Date());
  ethicsId!: number;
  form = this.fb.group({
    accusationblackno: [''],
    accusationtype: [''],
    accusationincidentdate: [''],
    accusationincidentplace: [''],
    accusationcondemnationtype: [''],
    accusationcondemnation: [''],
    accusationissuedate: [''],
    accusationdetail: [''],
    accusationpunishmentdetail: [''],
    accusationviolatedetail: [''],
    accusationassignofficer: [''],
    accusationassigndate: [''],
    accuserinfo: [''],
    accusationfile: [''],
    accusationconsideration: this.fb.group({
      decisions: [''],
      otherDetail: [''],
    }),
  });
  requestNumber = '';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: EthicsService
  ) {}

  @Input() hideAllButtons = false;

  ngOnInit() {
    this.checkRequestId();
  }
  cancel() {
    this.router.navigate(['/', 'accusation']);
  }

  back() {
    // if(this.ethicsId){
      this.router.navigate(['/', 'accusation', 'detail', this.ethicsId || '']);
    // }else{
    //   this.router.navigate(['/', 'accusation', 'detail']);
    // }
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.saveEthics();
      }
    });
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      // console.log(params);
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res) => {
          console.log("in RES ::: ", res);
          const { accusationconsideration, ...payload } = res;
          const json = accusationconsideration as any;
          this.form.patchValue({ ...payload, accusationconsideration: json });
        });
      }
    });
  }
  saveEthics() {
    const ethics = new Ethics();
    const allowKey = Object.keys(ethics);
    const data = this.form.value as any;
    data.accusationconsideration = JSON.stringify(data.accusationconsideration);
    data.accuserinfo              = JSON.stringify(data?.accuserinfo);
    // console.log(this.ethicsId);
    // console.log(data.accuserinfo);
    // console.log(data.accusationfile);
    data.accusationfile           = JSON.stringify(
      mapFileInfo(data?.accusationfile)
    );
    const selectData = _.pick(data, allowKey);
    console.log(data);

    if (this.ethicsId) {
      selectData['id'] = this.ethicsId;
      console.log(selectData);
      this.service.updateEthicsAccusation(selectData).subscribe((res) => {
        console.log(res);
        this.onCompleted();
      });
    }
  }
  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        content: `เลขที่รายการ : ${this.ethicsId}
        วันที่ : ${this.today}`,
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาเจรา ไฟลุก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'accusation']);
      }
    });
  }
}

export const decisions = [
  {
    label: 'รับเรื่องพิจารณา และดำเนินการขั้นต่อไป',
    value: 1,
  },
  {
    label: 'ไม่รับเรื่องพิจารณาและจำหน่ายออก เนื่องจากอายุความเกิน 1 ปี',
    value: 2,
  },
  {
    label: 'ยุติเรื่องกรณีไม่มีหนังสืออนุญาต',
    value: 3,
  },
  {
    label: 'บัตรสนเทห์',
    value: 4,
  },
  {
    label: 'หนังสือร้องเรียนขาดสาระสำคัญ',
    value: 5,
  },
  {
    label:
      'เหตุเกิดก่อนข้อบังคับคุรุสภาว่าด้วยมาตรฐานวิชาชีพและจรรยาบรรณวิชาชีพ พ.ศ.2548',
    value: 6,
  },
  {
    label: 'อื่นๆ (ระบุด้วยตนเอง)',
    value: 7,
  },
];
