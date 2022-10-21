import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { SelfRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-e-teacher-council-detail',
  templateUrl: './e-teacher-council-detail.component.html',
  styleUrls: ['./e-teacher-council-detail.component.scss'],
})
export class ETeacherCouncilDetailComponent implements OnInit {
  userInfoType = UserInfoFormType.thai;

  provinces1$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  uniqueTimestamp!: string;
  rewardFiles: any[] = [];
  requestId!: number;

  form = this.fb.group({
    userInfo: [],
    addressInfo: [],
    address1: [],
    address2: [],
    eduInfo: [],
    hiringInfo: [],
    rewardEthicInfo: [],
    rewardSuccessInfo: [],
    rewardDetailInfo: [],
  });

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private addressService: AddressService,
    private educationDetailService: EducationDetailService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.getListData();
    this.checkRequestId();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.bureau$ = this.educationDetailService.getBureau();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.patchData(res);
            }
          });
      }
    });
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
      eduinfo,
      hiringinfo,
      rewardethicinfo,
      rewardsuccessinfo,
      rewarddetailinfo,
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
    this.form.controls.userInfo.patchValue(myInfo);
    const addressInfo = parseJson(addressinfo);
    this.patchAddressInfo(addressInfo);
    const eduInfo = parseJson(eduinfo);
    const hiringInfo = parseJson(hiringinfo);
    const rewardEthicInfo = parseJson(rewardethicinfo);
    const rewardSuccessInfo = parseJson(rewardsuccessinfo);
    const rewardDetailInfo = parseJson(rewarddetailinfo);
    this.form.patchValue({
      eduInfo,
      hiringInfo,
      rewardEthicInfo,
      rewardSuccessInfo,
      rewardDetailInfo,
    });
  }

  patchAddressInfo(value: any) {
    if (value?.length) {
      value.map((addr: any, i: number) => {
        if (i === 0) {
          this.amphurs1$ = this.addressService.getAmphurs(addr.province);
          this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.address1.patchValue(addr);
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.address2.patchValue(addr);
        }
      });
    }
  }
}
