import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ERewardFormBaseComponent } from '@ksp/self-service/form';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspRequest, SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

const FORM_TAB_COUNT = 7;

@Component({
  selector: 'ksp-e-thai-teacher-detail',
  templateUrl: './e-thai-teacher-detail.component.html',
  styleUrls: ['./e-thai-teacher-detail.component.scss'],
})
export class EThaiTeacherDetailComponent
  extends ERewardFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  provinces3$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  provinces4$!: Observable<any>;
  amphurs4$!: Observable<any>;
  tumbols4$!: Observable<any>;
  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  uniqueTimestamp!: string;
  rewardFiles: any[] = [];
  formTabCount = FORM_TAB_COUNT;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    workplace: [],
    eduInfo: [],
    hiringInfo: [],
    rewardTeacherInfo: [],
    rewardPunishmentInfo: [],

    phone: [],
    fax: [],
    email: [],
    website: [],
    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    route: ActivatedRoute,
    requestService: ERequestService,
    private addressService: AddressService,
    private router: Router,
    private educationDetailService: EducationDetailService
  ) {
    super(route, requestService);
  }

  ngOnInit(): void {
    this.verifyChoice = this.VERIFY_CHOICES;
    this.getListData();
    this.checkRequestId();
    this.addCheckResultArray();
    this.getMode();
  }

  addCheckResultArray() {
    for (let i = 0; i < FORM_TAB_COUNT; i++) {
      this.checkResultFormArray.push(this.fb.control([]));
    }
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.provinces3$ = this.provinces1$;
    this.provinces4$ = this.provinces1$;
    this.bureau$ = this.educationDetailService.getBureau();
  }

  patchData(data: SelfRequest) {
    const {
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
      rewardteacherinfo,
      rewardpunishmentinfo,
      eduinfo,
      hiringinfo,
      teachinginfo,
      fileinfo,
    } = data;
    const myInfo = <any>{
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
    };
    console.log(myInfo);
    this.form.controls.userInfo.patchValue(myInfo);

    const addressInfo = parseJson(addressinfo);
    this.patchAddressInfo(addressInfo);

    const workplaceInfo = parseJson(schooladdrinfo);
    this.patchWorkplaceInfo(workplaceInfo);

    const rewardTeacherInfo = parseJson(rewardteacherinfo);
    const rewardPunishmentInfo = parseJson(rewardpunishmentinfo);
    const eduInfo = parseJson(eduinfo);
    const hiringInfo = parseJson(hiringinfo);
    const teachingInfo = parseJson(teachinginfo);
    if (teachingInfo) {
      this.amphurs3$ = this.addressService.getAmphurs(teachingInfo.province);
      this.tumbols3$ = this.addressService.getTumbols(teachingInfo.district);
      this.amphurs4$ = this.addressService.getAmphurs(
        teachingInfo.currentProvince
      );
      this.tumbols4$ = this.addressService.getTumbols(
        teachingInfo.currentDistrict
      );
    }
    this.form.patchValue(<any>{
      rewardTeacherInfo,
      rewardPunishmentInfo,
      eduInfo,
      hiringInfo,
      teachingInfo,
    });

    if (fileinfo) {
      const { rewardfiles } = parseJson(fileinfo);
      this.rewardFiles = rewardfiles;
    }
  }

  patchAddressInfo(value: any) {
    if (value) {
      this.amphurs1$ = this.addressService.getAmphurs(value.province);
      this.tumbols1$ = this.addressService.getTumbols(value.amphur);
      this.form.controls.addressInfo.patchValue(value);
    }
  }

  patchWorkplaceInfo(value: any) {
    if (value) {
      this.amphurs2$ = this.addressService.getAmphurs(value.province);
      this.tumbols2$ = this.addressService.getTumbols(value.amphur);
      const { phone, fax, email, website } = value || {
        phone: '',
        fax: '',
        email: '',
        website: '',
      };
      this.form.controls.workplace.patchValue(value);
      this.form.patchValue({
        phone,
        fax,
        email,
        website,
      });
    }
  }

  next() {
    this.persistData(this.form.controls.checkResult.value);
    if (this.mode === 'check') {
      this.router.navigate(['/thai-teacher', 'check-confirm', this.requestId]);
    } else {
      this.router.navigate(['/thai-teacher', 'confirm', this.requestId]);
    }
  }

  cancel() {
    if (this.mode === 'check') {
      this.router.navigate(['/thai-teacher', 'check-list']);
    } else {
      this.router.navigate(['/thai-teacher']);
    }
  }
}
