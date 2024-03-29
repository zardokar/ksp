import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import { FormBuilder } from '@angular/forms';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  SelfRequestService,
  LoaderService,
} from '@ksp/shared/service';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import { FileGroup, SelfLicense, SelfRequest } from '@ksp/shared/interface';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import localForage from 'localforage';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-substitute-license-detail',
  templateUrl: './substitute-license-detail.component.html',
  styleUrls: ['./substitute-license-detail.component.scss'],
})
export class SubstituteLicenseDetailComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  userInfoType = UserInfoFormType.thai;
  objectiveFiles: FileGroup[] = [];
  myLicense = new SelfLicense();
  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    replaceReasonInfo: [],
  });

  constructor(
    dialog: MatDialog,
    router: Router,
    fb: FormBuilder,
    generalInfoService: GeneralInfoService,
    addressService: AddressService,
    educationDetailService: EducationDetailService,
    myInfoService: MyInfoService,
    requestService: SelfRequestService,
    route: ActivatedRoute,
    private loaderService: LoaderService
  ) {
    super(
      generalInfoService,
      addressService,
      educationDetailService,
      fb,
      requestService,
      router,
      myInfoService,
      route,
      dialog
    );
  }

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();

    const idcardno = getCookie('idCardNo');
    this.myInfoService.getMyLicense(idcardno).subscribe((res) => {
      if (res) {
        this.myLicense = res[0];
      }
    });
  }

  override initializeFiles() {
    super.initializeFiles();
    this.objectiveFiles = structuredClone(OBJECTIVE_FILES);
    this.uniqueTimestamp = uuidv4();
  }

  override patchData(data: SelfRequest) {
    super.patchData(data);

    if (data.replacereasoninfo) {
      const replaceReasonInfo = parseJson(data.replacereasoninfo);
      this.form.controls.replaceReasonInfo.patchValue(replaceReasonInfo);
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { replacereasoninfofiles } = fileInfo;
      this.objectiveFiles = replacereasoninfofiles;
    }
  }

  patchUserInfoForm(data: any): void {
    this.form.controls.userInfo.patchValue(data);
  }

  patchAddress1Form(data: any): void {
    this.form.controls.address1.patchValue(data);
  }

  patchAddress2Form(data: any): void {
    this.form.controls.address2.patchValue(data);
  }

  patchWorkPlaceForm(data: any): void {
    this.form.controls.workplace.patchValue(data);
  }

  patchAddress2FormWithAddress1(): void {
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
  }

  createRequest(currentProcess: number) {
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);

    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอใบแทนหนังสืออนุญาตประกอบวิชาชีพ,
      `${SelfServiceRequestSubType.อื่นๆ}`,
      currentProcess
    );
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    const allowKey = Object.keys(self);

    const replacereasoninfofiles = this.objectiveFiles;

    const initialPayload = {
      ...replaceEmptyWithNull(userInfo),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...(this.imageId && { imagefileid: `${this.imageId}` }),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{
        schooladdrinfo: JSON.stringify(formData.workplace),
      },
      ...{
        replacereasoninfo: JSON.stringify(formData.replaceReasonInfo),
      },
      ...{ fileinfo: JSON.stringify({ replacereasoninfofiles }) },
    };
    console.log(initialPayload);
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    console.log(payload);
    return payload;
  }

  next() {
    //console.log(this.form.value);
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(1);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
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
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            const requestno = res.requestno;
            localForage.setItem('requestno', requestno);
            this.router.navigate(['/license', 'payment-channel', res.id]);
          }
        });
      }
    });
  }

  back() {
    this.router.navigate(['/home']);
  }
}

const OBJECTIVE_FILES: FileGroup[] = [
  { name: '1. หนังสืออนุญาตประกอบวิชาชีพที่ชํารุด', files: [] },
  {
    name: '2. หลักฐานการรับแจ้งความของพนักงานสอบสวน หรือบันทึกถ้อยคํา กรณีหนังสืออนุญาตสูญหาย',
    files: [],
  },
];
