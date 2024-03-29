import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import {
  SelfServiceRequestSubType,
  SelfServiceRequestType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import { SelfRequestService, MyInfoService } from '@ksp/shared/service';
import {
  FileGroup,
  KspRequestCancelPayload,
  SelfGetRequest,
  SelfRequest,
} from '@ksp/shared/interface';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  ACADEMIC_FILES,
  RENEW_DOCUMENT_FILES,
} from './renew-license-foreign-files';
import localForage from 'localforage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-renew-license-foreign',
  templateUrl: './renew-license-foreign.component.html',
  styleUrls: ['./renew-license-foreign.component.scss'],
})
export class RenewLicenseForeignComponent implements OnInit {
  form = this.fb.group({
    personalDetail: [],
    personalDeclaration: [],
    renewalRequirements: [],
    foreignSelectUpload: [],
  });

  uniqueNo!: string;
  requestId!: number;
  requestData = new SelfRequest('1', '02', '5');
  userInfo: any;
  addressInfo: any;
  workplaceInfo: any;
  eduInfo: any;
  academicFiles: FileGroup[] = [];
  licensureInfo: any;
  personalDeclaration: any;
  documentFiles: FileGroup[] = [];
  myImage = '';
  requestType: any;
  requestLabel = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: SelfRequestService,
    private route: ActivatedRoute,
    private myInfoService: MyInfoService
  ) {}
  ngOnInit(): void {
    this.checkRequestId();
    this.checkCareerType();
  }

  get personalDetail() {
    return this.form.controls.personalDetail;
  }

  checkCareerType() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (Number(params['type'])) {
        this.requestType = Number(params['type']);
      }

      if (this.requestType === 1) {
        this.requestLabel = 'Teacher';
      } else if (this.requestType === 2) {
        this.requestLabel = 'Educational Institution';
      }
    });
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            //console.log(res);
            this.requestData = res;
            this.uniqueNo = res.uniqueno || '';
            //console.log(this.uniqueNo);
            this.patchData(res);
          }
        });
      } else {
        this.uniqueNo = uuidv4();
        this.academicFiles = structuredClone(ACADEMIC_FILES);
        this.documentFiles = structuredClone(RENEW_DOCUMENT_FILES);
        this.getMyInfo();
      }
    });
  }

  patchData(data: SelfGetRequest) {
    const address = parseJson(data.addressinfo);
    this.patchUserInfo(data);
    this.patchAddress(address, address?.[0].phone, address?.[0].email);
    //console.log('data ', data);

    if (data.schooladdrinfo) {
      const workplace = parseJson(data.schooladdrinfo);
      const { addressName, ...addressForm } = workplace;
      this.workplaceInfo = { addressName, addressForm };
    }

    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      this.eduInfo = eduInfo;
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { documentfiles, academicfiles } = fileInfo;
      this.documentFiles = documentfiles;
      this.academicFiles = academicfiles;
    }

    if (data.foreignlicensureinfo) {
      const licensureInfo = parseJson(data.foreignlicensureinfo);
      this.licensureInfo = licensureInfo;
    }

    if (data.checkprohibitproperty) {
      const personalDeclaration = parseJson(data.checkprohibitproperty);
      this.personalDeclaration = personalDeclaration;
    }

    if (data.foreignperformanceresult) {
      const foreignPerformanceResult = parseJson(data.foreignperformanceresult);
      this.form.controls.renewalRequirements.patchValue({
        ...foreignPerformanceResult,
      });
    }

    if (data.foreignselectupload) {
      const foreignSelectUpload = parseJson(data.foreignselectupload);
      this.form.controls.foreignSelectUpload.patchValue(foreignSelectUpload);
    }

    if (data.filedata) {
      this.myImage = atob(data.filedata);
    }
  }

  getMyInfo() {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.patchUserInfo(res);
      this.patchAddress(parseJson(res.addressinfo), res.phone, res.email);
      if (res.schooladdrinfo) {
        this.patchWorkplace(parseJson(res.schooladdrinfo));
      }

      if (res && res.filedata) {
        this.myImage = atob(res.filedata);
      }
    });
  }

  patchUserInfo(data: any) {
    const {
      birthdate,
      firstnameen,
      lastnameen,
      prefixen,
      id,
      middlenameen,
      passportno,
      nationality,
      foreignpassporttype,
    } = data || { foreignpassporttype: '' };
    const patchData = {
      birthdate: birthdate.split('T')[0],
      firstnameen,
      lastnameen,
      prefixen,
      id,
      middlenameen,
      passportno,
      nationality,
      foreignpassporttype,
    } as any;
    this.userInfo = patchData;
  }

  patchAddress(addrs: any[], phone: any, email: any) {
    if (addrs && addrs.length) {
      const addr = addrs[0];
      this.addressInfo = {
        ...addr,
        phone,
        email,
      };
    }
  }

  patchWorkplace(data: any) {
    this.workplaceInfo = {
      addressName: data.schoolname,
      addressForm: {
        houseNo: data.houseno,
        alley: data.alley,
        road: data.road,
        postcode: data.postcode,
        province: data.province,
        tumbol: data.tumbol,
        amphur: data.amphur,
      },
    };
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  save() {
    console.log(this.form.getRawValue());
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Do you want to save and proceed?`,
        btnLabel: 'Save & Proceed',
        cancelBtnLabel: ' Save (Draft)',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(1);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          //console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(2);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          //console.log('request result = ', res);
          if (res?.returncode === '00') {
            const requestno = res.requestno;
            localForage.setItem('requestno', requestno);
            this.router.navigate(['/license', 'payment-channel', res.id]);
          }
        });
      }
    });
  }

  createRequest(currentProcess: number) {
    const type =
      this.route.snapshot.queryParamMap.get('type') ||
      SelfServiceRequestSubType.ครู;
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอต่ออายุหนังสืออนุญาตประกอบวิชาชีพ,
      `${type}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    const formData: any = this.form.getRawValue();
    const {
      addressForm,
      workplaceForm,
      academicForm,
      // grantionLicenseForm,
      licensureInfoForm,
      ...userInfoForm
    } = formData.personalDetail;

    const { id, ...rawUserInfo } = userInfoForm;
    const userInfo = toLowercaseProp(rawUserInfo);
    self.isforeign = `${SelfServiceRequestForType.ชาวต่างชาติ}`;
    self.uniqueno = this.uniqueNo;
    self.userid = getCookie('userId');

    const selectData = _.pick(userInfo, allowKey);

    const { addressName, addressForm: resWorkplaceForm } = workplaceForm;
    const documentfiles = this.documentFiles;
    const academicfiles = this.academicFiles;

    const initialPayload = {
      ...replaceEmptyWithNull(selectData),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...{
        addressinfo: JSON.stringify([addressForm]),
      },
      ...{
        schooladdrinfo: JSON.stringify({
          addressName,
          ...resWorkplaceForm,
        }),
      },
      ...{ eduinfo: JSON.stringify(academicForm) },
      // ...{
      //   grantionteachinglicenseinfo: JSON.stringify(grantionLicenseForm),
      // },
      ...{
        foreignlicensureinfo: JSON.stringify(licensureInfoForm),
      },
      ...{
        foreignperformanceresult: JSON.stringify(formData.renewalRequirements),
      },
      ...{
        foreignselectupload: JSON.stringify(formData.foreignSelectUpload),
      },
      ...{
        checkprohibitproperty: JSON.stringify(formData.personalDeclaration),
      },
      ...{ fileinfo: JSON.stringify({ documentfiles, academicfiles }) },
    };
    console.log(initialPayload);
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    //console.log(payload);

    return payload;
  }

  onCancelRequest() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยกเลิกรายการแบบคำขอ
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.cancelRequest();
      }
    });
  }

  cancelRequest() {
    const payload: KspRequestCancelPayload = {
      requestid: `${this.requestId}`,
      process: `${this.requestData.process}`,
      userid: getCookie('userId'),
    };

    this.requestService.cancelRequest(payload).subscribe(() => {
      this.cancelCompleted();
    });
  }

  cancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยกเลิกแบบคำขอสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
}
