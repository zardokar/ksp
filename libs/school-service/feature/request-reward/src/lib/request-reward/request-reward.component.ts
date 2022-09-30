import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { SchoolRequest } from '@ksp/shared/interface';
import {
  GeneralInfoService,
  RequestService,
  SchoolInfoService,
} from '@ksp/shared/service';
import { mapFileInfo, parseJson, thaiDate } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ksp-request-reward-detail',
  templateUrl: './request-reward.component.html',
  styleUrls: ['./request-reward.component.scss'],
})
export class RequestRewardComponent implements OnInit {
  form = this.fb.group({
    reward: [],
  });

  rewards = rewards;
  schoolId = '0010201056';
  osoiTypes$!: Observable<any>;
  personTypes$!: Observable<any>;
  prefixList$!: Observable<any>;
  requestId = 0;
  requestDate: string | null = thaiDate(new Date());
  requestNo!: string | null;
  currentProcess!: string | null;
  requestStatus!: string | null;
  memberData!: any;
  disableTempSave = true;
  disablePermanentSave = true;
  disableCancel = false;
  uniqueTimeStamp!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: RequestService,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
    this.checkButtonDisableStatus();

    this.form.valueChanges.subscribe((res) => {
      this.checkButtonDisableStatus();
    });
  }

  checkButtonDisableStatus() {
    //console.log('this.currentprocess = ', this.currentProcess);
    if (!this.form.valid) {
      this.disableTempSave = true;
      this.disablePermanentSave = true;
      return;
    } else if (this.currentProcess === '2') {
      this.disableTempSave = true;
      this.disablePermanentSave = true;
    } else if (this.currentProcess === '1') {
      this.disableTempSave = false;
      this.disablePermanentSave = false;
    } else if (this.currentProcess === '0') {
      this.disableTempSave = true;
      this.disablePermanentSave = true;
      this.disableCancel = true;
    }
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      } else {
        this.uniqueTimeStamp = uuidv4();
      }
    });
  }

  onTempSave() {
    // if no requestid , create request with currentProcess = 1, requestStatus = 1
    if (!this.requestId) {
      this.createRequest('1', '1', this.form.controls.reward.value);
    } else {
      //if has requestid , update request with currentProcess = 1, requestStatus = 1
      this.updateRequest('1', '1', this.form.controls.reward.value);
    }
  }

  onPermanentSave() {
    // if no requestid , create request with currentProcess = 2, requestStatus = 1
    if (!this.requestId) {
      this.createRequest('2', '1', this.form.controls.reward.value);
    } else {
      // if has requestid , update request with currentProcess = 2, requestStatus = 1
      this.updateRequest('2', '1', this.form.controls.reward.value);
    }
  }

  cancelRequest() {
    // may need to update status also
    const payload = {
      id: `${this.requestId}`,
      requeststatus: '0',
    };
    this.requestService.cancelRequest(payload).subscribe((res) => {
      //
    });
  }

  loadRequestFromId(id: number) {
    this.requestService.getRequestById(id).subscribe((res) => {
      //console.log('res = ', res);
      this.uniqueTimeStamp = res.uniquetimestamp || 'default-unique-timestamp';
      this.requestNo = res.requestno;
      this.requestDate = thaiDate(new Date(`${res.requestdate}`));
      this.requestStatus = res.requeststatus;
      this.currentProcess = res.currentprocess;

      const osoiInfo = parseJson(res.osoiinfo);
      const osoiMember = parseJson(res.osoimember);
      //console.log('osoi info = ', osoiInfo);
      this.form.controls.reward.patchValue(osoiInfo);
      this.memberData = osoiMember;
      //console.log('current process = ', this.currentProcess);
      const file = parseJson(res.fileinfo);
      console.log('get file = ', file);
    });
  }

  updateRequest(currentProcess: string, requestStatus: string, form: any) {
    //console.log('form  = ', form);
    const baseForm = this.fb.group(new SchoolRequest());
    form.id = this.requestId;
    form.schoolid = this.schoolId;
    form.systemtype = `2`;
    form.requesttype = `40`;
    form.subtype = `5`;
    form.currentprocess = currentProcess;
    form.requeststatus = requestStatus;
    form.osoimember = JSON.stringify(form.osoimember);

    const rewardFiles = [
      { name: 'แบบ นร. 1', fileId: '' },
      { name: 'แบบ นร.2', fileId: '' },
      { name: 'เอกสารอื่นๆ', fileId: '' },
      { name: 'บันทึกนำส่งจากสถานศึกษา', fileId: '' },
    ];

    const file = structuredClone(rewardFiles);
    //console.log('file = ', file);
    const files = mapFileInfo(file);
    //console.log('map file = ', files);
    form.fileinfo = JSON.stringify({ files });

    const osoiInfo = {
      rewardname: form.rewardname,
      rewardtype: form.rewardtype,
      submitbefore: form.submitbefore,
      vdolink: form.vdolink,
    };
    form.osoiinfo = JSON.stringify(osoiInfo);

    baseForm.patchValue(form);

    const { ref1, ref2, ref3, ...payload } = baseForm.value;
    //console.log('payload = ', payload);
    this.requestService.updateRequest(payload).subscribe((res) => {
      //console.log('request result = ', res);
    });
  }

  createRequest(currentProcess: string, requestStatus: string, form: any) {
    //console.log('form  = ', form);
    const baseForm = this.fb.group(new SchoolRequest());
    form.schoolid = this.schoolId;
    form.ref1 = `2`;
    form.ref2 = '40';
    form.ref3 = '5';
    form.systemtype = `2`;
    form.requesttype = `40`;
    form.subtype = `5`;
    form.currentprocess = currentProcess;
    form.requeststatus = requestStatus;
    form.uniquetimestamp = this.uniqueTimeStamp;
    form.osoimember = JSON.stringify(form.osoimember);

    const osoiInfo = {
      rewardname: form.rewardname,
      rewardtype: form.rewardtype,
      submitbefore: form.submitbefore,
      vdolink: form.vdolink,
    };
    form.osoiinfo = JSON.stringify(osoiInfo);

    baseForm.patchValue(form);
    //console.log('current form = ', baseForm.value);
    this.requestService.createRequest(baseForm.value).subscribe((res) => {
      //console.log('request result = ', res);
    });
  }

  getListData() {
    this.osoiTypes$ = this.schoolInfoService.getOsoiTypes();
    this.personTypes$ = this.schoolInfoService.getPersonTypes();
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  previousPage() {
    this.router.navigate(['/temp-license', 'list']);
  }

  save(form: any) {
    /*     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    }); */
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ระบบทำการบันทึก
        และส่งเรื่องให้เเจ้าหน้าที่เรียบร้อยแล้ว`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.previousPage();
      }
    });
  }
}

export const rewards = [
  { label: 'ไม่เคยส่งเข้ารับการคัดสรรกับคุรุสภา', value: 1 },
  {
    label: 'เคยส่งเข้ารับการคัดสรรกับคุรุสภา แต่ไม่ได้รับรางวัลของคุรุสภา',
    value: 2,
  },
  {
    label: 'ได้รับรางวัลของคุรุสภา แต่มีการพัฒนาต่อยอดนวัตกรรม',
    value: 3,
  },
];
