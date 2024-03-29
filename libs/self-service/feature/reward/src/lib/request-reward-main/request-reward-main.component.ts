import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  KspRequestCancelPayload,
  ListData,
  SelfMyInfo,
  SelfRequest,
} from '@ksp/shared/interface';
import {
  MyInfoService,
  SelfRequestService,
  GeneralInfoService,
  EducationDetailService,
  LoaderService,
  AddressService,
} from '@ksp/shared/service';
import {
  getCookie,
  providerFactory,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { parseJson } from '@ksp/shared/utility';
import { MatDialog } from '@angular/material/dialog';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SelfServiceRequestForType,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { v4 as uuidv4 } from 'uuid';
import { RequestRewardMainService } from './request-reward-main.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-request-reward-main',
  templateUrl: './request-reward-main.component.html',
  styleUrls: ['./request-reward-main.component.scss'],
  providers: providerFactory(RequestRewardMainComponent),
})
export class RequestRewardMainComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  headerGroup = [
    'วันที่ทำรายการ',
    'เลขแบบคำขอ',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'เลขที่หนังสืออนุญาต',
    'วันที่ออกหนังสืออนุญาต',
    'วันที่หมดอายุหนังสืออนุญาต',
  ];

  rewardTypes: ListData[] = rewardTypes;
  myInfo!: SelfMyInfo;
  addressInfo: any;
  workplaceInfo: any;
  requestId!: number | null;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;
  currentStatus!: number;

  form = this.fb.group({
    rewardType: [0],
    rewardDetail: [],
    careerType: ['0'],
    province: [null],
  });

  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  uniqueTimestamp!: string;
  rewardFiles: any[] = [];
  moneyAssistanceFiles: any[] = [];
  provinces$!: Observable<any>;

  constructor(
    private requestService: SelfRequestService,
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private generalInfoService: GeneralInfoService,
    private educationDetailService: EducationDetailService,
    private dialog: MatDialog,
    private router: Router,
    private service: RequestRewardMainService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureau$ = this.educationDetailService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        // this.loadRequestFromId(this.requestId);
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            console.log(res);
            this.requestData = res;
            this.requestNo = res.requestno;
            this.currentProcess = Number(res.process);
            this.currentStatus = Number(res.status);
            this.uniqueTimestamp = res.uniqueno || '';
            console.log(this.uniqueTimestamp);

            this.patchData(res);
            this.getFormType();
          }
        });
      } else {
        this.getFormType();
      }
    });
  }

  getFormType() {
    this.form.controls.rewardType.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        const formType = +(res || 0);
        console.log(formType);
        if (formType > 0) {
          this.clearForm();
          this.requestId = null;
          this.initializeFiles(formType);
          this.getMyInfo(formType);
        }
      });
  }

  clearForm() {
    this.form.controls.rewardDetail.patchValue(<any>{
      eduInfo: null,
      hiringInfo: null,
      rewardEthicInfo: null,
      rewardSuccessInfo: null,
      rewardDetailInfo: null,
    });
  }

  patchData(data: SelfRequest) {
    console.log(data);
    const {
      requesttype,
      prefixth,
      prefixen,
      firstnameth,
      firstnameen,
      lastnameth,
      lastnameen,
      sex,
      birthdate,
      contactphone,
      workphone,
      email,
      addressinfo,
      schooladdrinfo,
      eduinfo,
      hiringinfo,
      rewardethicinfo,
      rewardsuccessinfo,
      rewarddetailinfo,
      rewardteacherinfo,
      teachinginfo,
      rewardpunishmentinfo,
      rewardcareerinfo,
      rewardmoneysupportinfo,
      rewardresearcherinfo,
      rewardresearchinfo,
      rewardresearchhistory,
      fileinfo,
      careertype,
      idcardno,
      ...resData
    } = data;
    const rewardType = +(requesttype || 0);
    const { rewardfiles, moneyassistancefiles } = parseJson(fileinfo);
    this.rewardFiles = rewardfiles;
    this.moneyAssistanceFiles = moneyassistancefiles;
    console.log(rewardfiles);

    this.form.patchValue({
      rewardType,
    });

    this.myInfo = <any>{
      prefixth,
      prefixen,
      firstnameth,
      firstnameen,
      lastnameth,
      lastnameen,
      sex,
      birthdate: birthdate?.split('T')[0],
      contactphone,
      workphone,
      email,
      idcardno,
    };
    this.addressInfo = parseJson(addressinfo);
    this.workplaceInfo = parseJson(schooladdrinfo);
    console.log(this.workplaceInfo);

    this.form.controls.careerType.patchValue(careertype);

    switch (rewardType) {
      case 40: {
        const eduInfo = parseJson(eduinfo);
        const hiringInfo = parseJson(hiringinfo);
        const rewardEthicInfo = parseJson(rewardethicinfo);
        const rewardSuccessInfo = parseJson(rewardsuccessinfo);
        const rewardDetailInfo = parseJson(rewarddetailinfo);
        this.form.controls.rewardDetail.patchValue(<any>{
          eduInfo,
          hiringInfo,
          rewardEthicInfo,
          rewardSuccessInfo,
          rewardDetailInfo,
        });
        break;
      }
      case 41: {
        const rewardTeacherInfo = parseJson(rewardteacherinfo);
        const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
        const eduInfo = parseJson(eduinfo);
        const hiringInfo = parseJson(hiringinfo);
        const teachingInfo = parseJson(teachinginfo);
        this.form.controls.rewardDetail.patchValue(<any>{
          rewardTeacherInfo,
          rewardPunishmentInfo,
          eduInfo,
          hiringInfo,
          teachingInfo,
        });
        break;
      }
      case 42: {
        const eduInfo = parseJson(eduinfo);
        const hiringInfo = parseJson(hiringinfo);
        const rewardDetailInfo = parseJson(rewarddetailinfo);
        const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
        this.form.controls.rewardDetail.patchValue(<any>{
          eduInfo,
          hiringInfo,
          rewardDetailInfo,
          rewardPunishmentInfo,
        });
        break;
      }
      case 43: {
        const eduInfo = parseJson(eduinfo);
        const hiringInfo = parseJson(hiringinfo);
        const rewardDetailInfo = parseJson(rewarddetailinfo);
        const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
        const rewardTeacherInfo = parseJson(rewardteacherinfo);
        this.form.controls.rewardDetail.patchValue(<any>{
          eduInfo,
          hiringInfo,
          rewardDetailInfo,
          rewardPunishmentInfo,
        });
        this.form.patchValue({ province: rewardTeacherInfo?.province || null });
        break;
      }
      case 44: {
        const rewardCareerInfo = parseJson(rewardcareerinfo);
        const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
        const rewardMoneySupportInfo = parseJson(rewardmoneysupportinfo);

        this.form.controls.rewardDetail.patchValue(<any>{
          rewardCareerInfo,
          rewardPunishmentInfo,
          rewardMoneySupportInfo,
        });
        break;
      }
      case 45: {
        const rewardResearcherInfo = parseJson(rewardresearcherinfo);
        const rewardResearchInfo = parseJson(rewardresearchinfo);
        const rewardResearchHistory = parseJson(rewardresearchhistory);
        const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
        this.form.controls.rewardDetail.patchValue(<any>{
          rewardResearcherInfo,
          rewardResearchInfo,
          rewardResearchHistory,
          rewardPunishmentInfo,
        });
        break;
      }
    }
  }

  getMyInfo(formType: number) {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.myInfo = {
        ...res,
        birthdate: res.birthdate?.split('T')[0] || null,
        contactphone: res.phone,
      };

      const addresses = parseJson(res.addressinfo);
      console.log(addresses);
      if (addresses?.length) {
        if (formType === 40) {
          this.addressInfo = addresses;
        } else {
          this.addressInfo = addresses[0];
        }
      }

      if (res.schooladdrinfo) {
        this.workplaceInfo = parseJson(res.schooladdrinfo);
        console.log(this.workplaceInfo);
      }
    });
  }

  initializeFiles(formType: number) {
    this.uniqueTimestamp = uuidv4();
    this.moneyAssistanceFiles = structuredClone(
      this.service.moneyAssistanceFiles
    );

    switch (formType) {
      case 40:
        this.rewardFiles = structuredClone(this.service.councilRewardFiles);
        break;
      case 41:
        this.rewardFiles = structuredClone(this.service.thaiTeacherRewardFiles);
        break;
      case 42:
        this.rewardFiles = structuredClone(this.service.bestTeacherRewardFiles);
        break;
      case 43:
        this.rewardFiles = structuredClone(this.service.praiseRewardFiles);
        break;
      case 44:
        this.rewardFiles = structuredClone(
          this.service.seniorTeacherRewardFiles
        );
        break;
      case 45:
        this.rewardFiles = structuredClone(this.service.researchRewardFiles);
        break;
    }
  }

  tempSave() {
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
        const payload = this.createRequest(1);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          } else if (res.returncode === '409') {
            this.sameIdCardDialog();
          }
        });
      }
    });
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(2);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.completeDialog();
          } else if (res.returncode === '409') {
            this.sameIdCardDialog();
          }
        });
      }
    });
  }

  createRequest(currentProcess: number) {
    const self = new SelfRequest(
      '1',
      `${this.form.value.rewardType}`,
      this.form.value.careerType || '0',
      currentProcess
    );
    const allowKey = Object.keys(self);
    const form: any = this.form.value.rewardDetail;
    //console.log(form);
    const userInfo = toLowercaseProp(form.userInfo);
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    userInfo.addressinfo = null;
    const selectData = _.pick(userInfo, allowKey);
    const rewardfiles = this.rewardFiles;
    const moneyassistancefiles = this.moneyAssistanceFiles;

    if (this.form.value?.rewardType === 43) {
      form.rewardTeacherInfo = {
        province: this.form.value.province,
      };
    }

    const filledData = {
      ...self,
      ...selectData,
      ...(form.addressInfo && {
        addressinfo: JSON.stringify(form.addressInfo),
      }),
      ...{
        schooladdrinfo: JSON.stringify(form.workplace),
      },
      ...(form.rewardTeacherInfo && {
        rewardteacherinfo: JSON.stringify(form.rewardTeacherInfo),
      }),
      ...(form.eduInfo && {
        eduinfo: JSON.stringify(form.eduInfo),
      }),
      ...(form.hiringInfo && {
        hiringinfo: JSON.stringify(form.hiringInfo),
      }),
      ...(form.teachingInfo && {
        teachinginfo: JSON.stringify(form.teachingInfo),
      }),
      ...(form.rewardEthicInfo && {
        rewardethicinfo: JSON.stringify(form.rewardEthicInfo),
      }),
      ...(form.rewardSuccessInfo && {
        rewardsuccessinfo: JSON.stringify(form.rewardSuccessInfo),
      }),
      ...(form.rewardDetailInfo && {
        rewarddetailinfo: JSON.stringify(form.rewardDetailInfo),
      }),
      ...(form.rewardPunishmentInfo && {
        rewardpunishmentinfo: JSON.stringify(form.rewardPunishmentInfo),
      }),
      ...(form.rewardCareerInfo && {
        rewardcareerinfo: JSON.stringify(form.rewardCareerInfo),
      }),
      ...(form.rewardMoneySupportInfo && {
        rewardmoneysupportinfo: JSON.stringify(form.rewardMoneySupportInfo),
      }),
      ...(form.rewardResearcherInfo && {
        rewardresearcherinfo: JSON.stringify(form.rewardResearcherInfo),
      }),
      ...(form.rewardResearchInfo && {
        rewardresearchinfo: JSON.stringify(form.rewardResearchInfo),
      }),
      ...(form.rewardResearchHistory && {
        rewardresearchhistory: JSON.stringify(form.rewardResearchHistory),
      }),
      ...{ fileinfo: JSON.stringify({ rewardfiles, moneyassistancefiles }) },
    };
    const { id, requestdate, ...payload } = replaceEmptyWithNull(filledData);
    console.log('payload = ', payload);
    if (this.requestId) {
      payload.id = this.requestId;
    }
    if (this.currentProcess) {
      payload.process = `${this.currentProcess}`;
    }
    if (this.currentStatus) {
      payload.status = `${this.currentStatus}`;
    }
    return payload;
  }

  cancel() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
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
      width: '350px',
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

  completeDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ทำรายการสร้างแบบคำขอสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  sameIdCardDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `หมายเลขบัตรประชาชนนี้ได้ถูกใช้ยื่นแบบคำขอ
        และกำลังอยู่ในระหว่างดำเนินการ !`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
}

const rewardTypes = [
  {
    value: 40,
    label: `รางวัลคุรุสภา`,
  },
  {
    value: 41,
    label: `รางวัลครูภาษาไทยดีเด่น`,
  },
  {
    value: 42,
    label: `รางวัลครูผู้สอนดีเด่น`,
  },
  {
    value: 43,
    label: `รางวัลคุรุสดุดี`,
  },
  {
    value: 44,
    label: `รางวัลครูอาวุโส`,
  },
  {
    value: 45,
    label: `รางวัลผลงานวิจัยของคุรุสภา`,
  },
];
