import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileGroup, SelfGetRequest, SelfRequest } from '@ksp/shared/interface';
import { MyInfoService, SelfRequestService } from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-foreign-detail',
  templateUrl: './renew-license-foreign-detail.component.html',
  styleUrls: ['./renew-license-foreign-detail.component.scss'],
})
export class RenewLicenseForeignDetailComponent implements OnInit {
  form = this.fb.group({
    personalDetail: [],
    personalDeclaration: [],
    renewalRequirements: [],
    foreignSelectUpload: [],
  });

  uniqueNo!: string;
  requestId!: number;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;
  userInfo: any;
  addressInfo: any;
  workplaceInfo: any;
  eduInfo: any;
  academicFiles: FileGroup[] = [];
  licensureInfo: any;
  personalDeclaration: any;
  documentFiles: FileGroup[] = [];
  myImage = '';

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
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
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
}
