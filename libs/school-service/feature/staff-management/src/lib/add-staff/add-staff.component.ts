import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddressService,
  GeneralInfoService,
  StaffService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';
import {
  formatCheckboxData,
  formatDatePayload,
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  replaceUndefinedWithNull,
} from '@ksp/shared/utility';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { levels, subjects, UserInfoFormType } from '@ksp/shared/constant';
import {
  AcademicStanding,
  Amphur,
  Country,
  FormMode,
  Nationality,
  PositionType,
  Prefix,
  Province,
  SchStaff,
  StaffType,
  Tambol,
  VisaClass,
  VisaType,
} from '@ksp/shared/interface';
import localForage from 'localforage';

@UntilDestroy()
@Component({
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  staffId!: number;
  countries$!: Observable<Country[]>;
  nationList$!: Observable<Nationality[]>;
  visaTypeList!: Observable<VisaType[]>;
  visaClassList!: Observable<VisaClass[]>;

  provinces$!: Observable<Province[]>;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  prefixList$!: Observable<Prefix[]>;
  staffTypes$!: Observable<StaffType[]>;
  positionTypes$!: Observable<PositionType[]>;
  academicTypes$!: Observable<AcademicStanding[]>;
  schoolId = getCookie('schoolId');
  mode: FormMode = 'add';
  userInfoType = UserInfoFormType.thai;
  searchStaffDone = false;
  kuruspaNo = '';
  eduSelected: number[] = [];

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu: this.fb.array([]),
    /*     edu1: [],
    edu2: [], */
    teachingInfo: [],
    hiringInfo: [],
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private staffService: StaffService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form.reset();
    this.checkMode();
    this.getList();
    this.checkStaffId();
    this.addEdu();
    this.form.valueChanges.subscribe((res) => console.log(this.form.value));
  }

  get edu() {
    return this.form.controls.edu as FormArray;
  }

  addEdu(degreeLevel: number = 1) {
    const eduForm = this.fb.group({
      degreeLevel: [degreeLevel],
      degreeName: [null],
      isEducationDegree: [],
      major: [null],
      institution: [null],
      country: [],
      admissionDate: [],
      graduateDate: [],
      grade: [],
      otherProperty: [],
      academicYear: [],
    });
    this.edu.push(eduForm);
  }

  eduSelect(index: number, evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.addEdu(2);
    } else {
      this.form.controls.edu.removeAt(1);
    }
  }

  checkStaffId() {
    this.activatedroute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        //console.log('param = ', params);
        this.staffId = Number(params.get('id'));
        if (this.staffId) {
          this.loadStaffData(this.staffId);
        }

        // redirect from search idcard page
        const idcardno = Number(params.get('idcardno'));
        const kuruspano = Number(params.get('kuruspano'));

        if (idcardno) {
          this.searchStaffDone = true;
          const temp: any = { idcardno: `${idcardno}` };
          this.form.controls.userInfo.patchValue(temp);
        }

        if (kuruspano) {
          this.searchStaffDone = true;
          const temp: any = { kuruspano: `${kuruspano}` };
          this.form.controls.userInfo.patchValue(temp);
        }
      });
  }

  searchIdCard(idcardno: string) {
    if (this.mode === 'view') {
      return;
    }

    const payload = {
      idcardno,
      schoolid: this.schoolId,
    };

    this.staffService
      .searchStaffFromIdCard(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res && res.returncode !== '98') {
          // found staff
          this.router.navigate(['/staff-management', 'edit-staff', res.id]);
        } else {
          // not found then reset form and set idcard again
          this.router.navigate([
            '/staff-management',
            'add-staff-thai',
            idcardno,
          ]);
        }
        this.searchStaffDone = true;
      });
  }

  searchKuruspaNo(kuruspano: string) {
    if (this.mode === 'view') {
      return;
    }

    const payload = {
      kuruspano,
      schoolid: this.schoolId,
    };

    this.staffService
      .searchStaffFromKuruspaNo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res && res.returncode !== '98') {
          // found staff
          this.router.navigate(['/staff-management', 'edit-staff', res.id]);
        } else {
          // not found then reset form and set kuruspano again
          this.router.navigate([
            '/staff-management',
            'add-staff-foreign',
            kuruspano,
          ]);
        }
        this.searchStaffDone = true;
      });
  }

  save() {
    if (this.staffId) {
      this.updateStaff();
    } else {
      this.insertStaff();
    }
  }

  pathTeachingInfo(res: any) {
    //console.log('teaching = ', res);
    const teachingLevel = levels.map((level) => {
      if (res.teachingLevel.includes(level.value)) {
        return level.value;
      } else {
        return false;
      }
    });

    const teachingSubjects = subjects.map((subj) => {
      if (res.teachingSubjects.includes(subj.value)) {
        return subj.value;
      } else {
        return false;
      }
    });
    const data = {
      ...res,
      teachingLevel,
      teachingSubjects,
    };
    this.form.controls.teachingInfo.patchValue(data);
  }

  checkMode() {
    if (this.router.url.includes('add-staff-has-license')) {
      this.searchStaffDone = true;
      this.mode = 'edit';
      this.patchDataFromLicense();
    } else if (this.router.url.includes('view-staff')) {
      this.searchStaffDone = true;
      this.mode = 'view';
      this.form.disable();
    } else if (this.router.url.includes('add-staff-thai')) {
      this.mode = 'add';
      this.userInfoType = UserInfoFormType.thai;
    } else if (this.router.url.includes('add-staff-foreign')) {
      this.mode = 'add';
      this.userInfoType = UserInfoFormType.foreign;
    } else if (this.router.url.includes('edit-staff')) {
      this.mode = 'edit';
    }
  }

  /**
   * * this person has license patch data from indexedDB
   */
  patchDataFromLicense() {
    localForage.getItem('add-staff-has-license').then((res: any) => {
      //console.log('stored data = ', res);
      this.form.controls.userInfo.patchValue(res);
      //this.pathUserInfo(res);
    });
  }

  loadStaffData(staffId: number) {
    this.staffService
      .loadStaffFromId(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res && res.kuruspano) {
          this.userInfoType = UserInfoFormType.foreign;
        }
        this.patchAll(res);
      });
  }

  isForeignSelect(evt: any) {
    this.form.reset();
    const checked = evt.target.checked;
    if (checked) {
      this.userInfoType = UserInfoFormType.foreign;
    } else {
      this.userInfoType = UserInfoFormType.thai;
    }
  }

  patchAll(res: any) {
    this.pathUserInfo(res);
    this.patchAddress(parseJson(res.addresses));
    this.patchEdu(parseJson(res.educations));
    this.pathTeachingInfo(parseJson(res.teachinginfo));

    console.log('hiring = ', parseJson(res.hiringinfo));

    this.form.controls.hiringInfo.patchValue(parseJson(res.hiringinfo));
  }

  insertStaff() {
    const baseForm = this.fb.group(new SchStaff());
    const formData: any = this.form.getRawValue();

    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    const teaching: any = this.form.controls.teachingInfo.value;
    const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
    const teachingSubjects = formatCheckboxData(
      teaching.teachingSubjects,
      subjects
    );
    const teachingInfo = {
      teachingLevel,
      teachingSubjects,
      teachingSubjectOther: teaching.teachingSubjectOther || null,
    };

    const { id, ...userInfo } = formData.userInfo;
    userInfo.schoolid = this.schoolId;

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{ addresses: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ educations: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringInfo) },
    };

    baseForm.patchValue(payload);
    let staff = replaceUndefinedWithNull(baseForm.value);
    staff = formatDatePayload(staff);

    this.staffService.addStaff(staff).subscribe(() => {
      this.onCompleted();
    });
  }

  updateStaff() {
    const formData: any = this.form.getRawValue();
    console.log('form data = ', formData);
    formData.userInfo.schoolid = this.schoolId;

    const teaching: any = this.form.controls.teachingInfo.value;
    const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
    const teachingSubjects = formatCheckboxData(
      teaching.teachingSubjects,
      subjects
    );
    const teachingInfo = {
      teachingLevel,
      teachingSubjects,
      teachingSubjectOther: teaching.teachingSubjectOther || null,
    };

    let payload = {
      ...formData.userInfo,
      ...{ addresses: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ educations: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{
        teachinginfo: JSON.stringify(teachingInfo),
      },
      ...{ hiringinfo: JSON.stringify(formData.hiringInfo) },
    };

    payload = replaceEmptyWithNull(payload);
    payload = formatDatePayload(payload);

    this.staffService.updateStaff(payload).subscribe(() => {
      //console.log('update result = ', res);
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];
    this.form.controls.userInfo.patchValue(data);
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;
    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getList() {
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();

    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationList$ = this.generalInfoService.getNationality();
    this.visaClassList = this.generalInfoService.getVisaClass();
    this.visaTypeList = this.generalInfoService.getVisaType();

    this.staffTypes$ = this.staffService.getStaffTypes();
    this.positionTypes$ = this.staffService.getPositionTypes();
    this.academicTypes$ = this.staffService.getAcademicStandingTypes();
  }

  navigateBack() {
    this.router.navigate(['/staff-management', 'list']);
  }

  onConfirmed() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.save();
      }
    });
  }

  onCompleted() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.form.reset();
        this.navigateBack();
      }
    });
  }

  patchEdu(edus: any[]) {
    //console.log('edus = ', edus);
    if (edus && edus.length) {
      edus.map((edu, i) => {
        if (i === 0) {
          //this.form.controls.edu1.patchValue(edu);
        }
        if (i === 1) {
          //this.form.controls.edu2.patchValue(edu);
        }
      });
    }
  }

  patchAddress(addrs: any[]) {
    //console.log('add data = ', addrs);
    if (addrs && addrs.length) {
      addrs.map((addr: any, i: number) => {
        if (i === 0) {
          this.amphurs1$ = this.addressService.getAmphurs(addr.province);
          this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.addr1.patchValue(addr);
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.addr2.patchValue(addr);
        }
      });
    }
  }

  get addr1() {
    return this.form.controls.addr1;
  }

  get addr2() {
    return this.form.controls.addr2;
  }
}
