import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
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
import { FileGroup, SelfRequest } from '@ksp/shared/interface';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const OBJECTIVE_FILES: FileGroup[] = [
  {
    name: '1. สำเนาหลักฐานแสดงวุฒิการศึกษา',
    files: [],
  },
  {
    name: '2. รูปภาพถ่ายหน้าตรง ขนาด 1.5 x 2 นิ้ว',
    files: [],
  },
];

@Component({
  selector: 'ksp-compare-knowledge-request',
  templateUrl: './compare-knowledge-request.component.html',
  styleUrls: ['./compare-knowledge-request.component.scss'],
})
export class CompareKnowledgeRequestComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  objectiveFiles: any[] = [];
  userInfoType = UserInfoFormType.thai;
  countries$!: Observable<any>;

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    testResultCompareInfo: [],
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
    this.countries$ = this.addressService.getCountry();
  }

  get userInfoForm() {
    return this.form.controls.userInfo;
  }

  override resetForm() {
    super.resetForm();
    this.objectiveFiles = structuredClone(OBJECTIVE_FILES);
  }

  override initializeFiles(): void {
    super.initializeFiles();
    this.objectiveFiles = structuredClone(OBJECTIVE_FILES);
    this.uniqueTimestamp = uuidv4();
  }

  override patchData(data: SelfRequest) {
    super.patchData(data);
    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      this.form.controls.educationInfo.patchValue({
        ...eduInfo,
      } as any);
    }

    if (data.testresultcompareinfo) {
      const testResultCompareInfo = parseJson(data.testresultcompareinfo);
      console.log(testResultCompareInfo);
      this.form.controls.testResultCompareInfo.patchValue({
        ...testResultCompareInfo,
      });
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { attachfiles } = fileInfo;
      this.objectiveFiles = attachfiles;
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
      SelfServiceRequestType.ขอยื่นเทียบเคียงความรู้,
      `${SelfServiceRequestSubType.อื่นๆ}`,
      currentProcess
    );
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    const allowKey = Object.keys(self);

    const attachfiles = this.objectiveFiles;

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
        eduinfo: JSON.stringify(formData.educationInfo),
      },
      ...{
        testresultcompareinfo: JSON.stringify(formData.testResultCompareInfo),
      },
      ...{ fileinfo: JSON.stringify({ attachfiles }) },
    };
    console.log(initialPayload);
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    console.log(payload);
    return payload;
  }

  submit(type: number) {
    console.log(this.form.value);
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(type);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.onCompleted();
          }
        });
      }
    });
  }

  override onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}
