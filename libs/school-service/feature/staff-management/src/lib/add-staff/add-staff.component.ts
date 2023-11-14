import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddressService,
  GeneralInfoService,
  LoaderService,
  SchoolLicenseService,
  StaffService,
  KSPXLicenseService
} from '@ksp/shared/service';
import { Observable, Subject } from 'rxjs';
import {
  formatCheckboxData,
  formatDatePayload,
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  replaceUndefinedWithNull,
  zutils
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
  formEdu,
  FormMode,
  Nationality,
  PositionType,
  Prefix,
  Province,
  SchStaff,
  SelfLicense,
  StaffType,
  Tambol,
  University,
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
  selectLicTab = '';
  licenseInfo: SelfLicense| null | any = null;

  isLoading: Subject<boolean> = this.loaderService.isLoading;
  staffId!: any;
  staffbirthdate!: string;
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
  universityList$!: Observable<University[]>;
  schoolId = getCookie('schoolId');
  mode: FormMode = 'add';
  userInfoType = UserInfoFormType.thai;
  searchStaffDone = false;
  kuruspaNo = '';
  eduSelected: number[] = [];
  foundLicenses: SelfLicense[] = [];
  notFound = false;
  selectedTabIndex = 0;
  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu: this.fb.array([]),
    teachingInfo: [],
    hiringInfo: [],
    licenseno:'',
    usertype:'',
    certificatestartdate:'',
    certificateenddate:'',
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private staffService: StaffService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    public dialog: MatDialog,
    private licenseService: SchoolLicenseService,
    private loaderService: LoaderService,
    private kspxlicservice : KSPXLicenseService
  ) {}

  ngOnInit(): void {
    this.form.reset();
    this.checkMode();
    this.getList();
    this.checkStaffId();
    /*     this.form.valueChanges.subscribe((res) => {
      //console.log('form = ', this.form.controls.userInfo.value);
      //console.log('form valid = ', this.form.controls.userInfo);
    }); */
  }

  searchLicense(staffId: any) {
    console.log(`searchLicense`)
    this.notFound = false;

    const payload = {
      cardno: staffId,
      idcardno: staffId,
      licenseno: null,
      name: null,
      licensetype: null,
      licensestatus: null,
      offset: '0',
      row: '100',
    };

    this.kspxlicservice.searchSelfLicense(payload) 
    .pipe(untilDestroyed(this))
    .subscribe((res) => {

      console.log(res)
      this.licenseInfo = selectLicense(res,this.staffbirthdate)
      console.log(  this.licenseInfo )

      console.log( this.form.controls.licenseno )
      // this.form.controls.licenseno       = res[0].licenseno as string;
      // this.form.usertype              = res[0].usertype as string;
      // this.form.certificatestartdate  = res[0].certificatestartdate as string;
      // this.form.certificateenddate    = res[0].certificateenddate as string;

    });

  }

  get edu() {
    return this.form.controls.edu as FormArray;
  }

  patchEdu(edus: formEdu[]) {
    if (edus && edus.length) {
      edus.map((edu, i) => {
        this.addEdu(edu);
      });
    }
  }

  addEdu(payload: Partial<formEdu>) {
    const eduForm = this.fb.group({
      degreeLevel: [payload.degreeLevel],
      degreeName: [payload.degreeName],
      isEducationDegree: [payload.isEducationDegree],
      major: [payload.major],
      institution: [payload.institution],
      country: [payload.country],
      admissionDate: [payload.admissionDate],
      graduateDate: [payload.graduateDate],
      grade: [payload.grade],
      otherProperty: [payload.otherProperty],
      academicYear: [payload.vacademicYear],
    });
    this.edu.push(eduForm);
  }

  eduSelect(index: number, evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.addEdu({ degreeLevel: '2' });
    } else {
      this.form.controls.edu.removeAt(1);
    }
  }

  checkStaffId() {
    console.log(`checkStaffId`)
    this.activatedroute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        //console.log('param = ', params);
        this.staffId = isNaN(Number(params.get('id'))) === false ? Number(params.get('id')) : null ;
        //console.log('staff id = ', this.staffId);
        if (this.staffId) {
          this.searchStaffDone = true;
          this.loadStaffData(this.staffId);
        } else {
          this.addEdu({ degreeLevel: '1' });
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
          localForage.getItem('sch-kuruspa-no').then((res: any) => {
            //console.log('res = ', res);
            res.country = res.country.toString().padStart(3, '0'); // country need to re-format
            this.form.controls.userInfo.patchValue(res);
          });
        }

        if (idcardno) {
          this.searchLicense(idcardno);
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
      .subscribe((ocnres) => {
        if( ocnres.returncode === '98' )
        {
          this.staffService
          .searchKSPXStafffromIDCard(payload)
          .subscribe((res) => {

            console.log(`searchIdCard`, res)

            const reslen = res.length
            // Convert Data from self
            if(reslen > 0)
            {
              res = res[0]
              res = this.convertSelfData(res)
              idcardno = res.idcardno 
      
              this.patchAll(res)
            }

            if ( reslen > 0 ) {
              // found staff
              this.router.navigate(['/staff-management', 'edit-staff', res.id]);
            } else {
              // not found then reset form and set idcard again
              this.router.navigate(['/staff-management', 'add-staff-thai',idcardno ]);
            }
            this.searchStaffDone = true;
          });
        }else{
          this.router.navigate(['/staff-management', 'edit-staff', ocnres.id]);
        }
      })

  }

  searchKuruspaNo(kspno: string) {
    if (this.mode === 'view') {
      return;
    }
    this.licenseService.searchKuruspaNo(kspno).subscribe((res) => {
      console.log('mode x = ', this.mode);
      if (this.mode === 'edit' && res && res.kuruspano) {
        localForage.setItem('sch-kuruspa-no', res);
      } else if (res && res.kuruspano) {
        localForage.setItem('sch-kuruspa-no', res);
        this.router.navigate(['/staff-management', 'add-staff-foreign', kspno]);
      } else {
        const dialog = this.dialog.open(CompleteDialogComponent, {
          data: {
            header: `ไม่พบข้อมูลหมายเลขคุรุสภาที่ระบุ`,
            btnLabel: 'ตกลง',
          },
        });

        dialog.componentInstance.completed.subscribe((res) => {
          if (res) {
            this.router.navigate(['/staff-management', 'add-staff']);
          }
        });
      }
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

    let teachingLevel : any
    let teachingSubjects : any

    if(zutils.exist(res,'teachingLevel'))
    {
        teachingLevel  = levels.map((level) => {
            if (res.teachingLevel.includes(level.value)) {
              return level.value;
            } else {
              return false;
            }
          }
        );
  
       teachingSubjects = subjects.map((subj) => {
        if (res.teachingSubjects.includes(subj.value)) {
          return subj.value;
        } else {
          return false;
        }
      });

    }

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
      this.patchDataFromLicense();
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
    console.log(`loadStaffData`)
    this.staffService
      .loadStaffFromId(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {

        this.patchAll(res);
        if (res && res.kuruspano) {
          this.userInfoType = UserInfoFormType.foreign;
        }
        if (res.idcardno) {
          this.searchLicense(res.idcardno);
        }
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
    //console.log('patchAll = ', res);
    this.pathUserInfo(res);
    try{ this.patchAddress(parseJson(res.addresses)); }catch(excp){ console.log(excp)}
    try{ this.patchEdu(parseJson(res.educations)); }catch(excp){ console.log(excp)}
    try{ this.pathTeachingInfo(parseJson(res.teachinginfo)); }catch(excp){ console.log(excp)}
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
      ...{ educations: JSON.stringify(formData.edu) },
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
    //console.log('form data = ', formData);
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
      ...{ educations: JSON.stringify(formData.edu) },
      ...{
        teachinginfo: JSON.stringify(teachingInfo),
      },
      ...{ hiringinfo: JSON.stringify(formData.hiringInfo) },
    };

    payload = replaceEmptyWithNull(payload);
    payload = formatDatePayload(payload);

    this.staffService.updateStaff(payload).subscribe(() => {
      this.onCompleted();
    });
  }

  pathUserInfo(data: any) {
    console.log(data,`pathUserInfo`)

    if(data.birthdate)
      this.staffbirthdate = data.birthdate

    if(data.idcardno)
      this.searchLicense(data.idcardno)

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
    this.universityList$ = this.licenseService.getUniversityList();
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

  nextTab() {
    if (this.selectedTabIndex < 2) {
      this.selectedTabIndex++;
    }
  }

  prevTab() {
    if (this.selectedTabIndex == 0) {
      this.navigateBack();
    } else {
      this.selectedTabIndex--;
    }
  }

  convertSelfData(respdata : any)
  {
    const address =     {
                          "houseNo": respdata.addressno,
                          "province": respdata.addressprovinceid,
                          "addressType": 2,
                          "road": respdata.addressroad,
                          "location": null,
                          "moo": respdata.addressmoo,
                          "alley": respdata.addressalley,
                          "id": null,
                          "postcode": respdata.addresszipcode,
                          "amphur": respdata.amphur,
                          "tumbol": respdata.addresssubdistrictid
    } 
    respdata.schoolid       = '1091560154'

    respdata.sex            = respdata.genderid
    respdata.contactphone   = respdata.phonenumber

    respdata.idcardno       = respdata.identitynumber 
    respdata.prefixth       = respdata.titlethid
    respdata.firstnameth    = respdata.nameth

    respdata.prefixen       = respdata.titleenid
    respdata.firstnameen    = respdata.nameen
    respdata.middlenameen   = respdata.middlename

    respdata.nationality    = respdata.nationalityid || 'TH'

    respdata.iaddresses      = []
    respdata.iaddresses.push(address)
    respdata.iaddresses.push(address)

    return respdata
  }

  onClickTabLicenseType(data : any){
    this.selectLicTab = data
  }
}


// ----------------------------------------------------
function selectLicense(dataarray : any[any], birthdate : string = '')
{
  const result : SelfLicense  = {}
  const now                   = new Date()

  dataarray.map( (license : any) => {
    const cert_end = zutils.exist(license.certificateenddate) ? new Date( license.certificateenddate ) : undefined
    if( cert_end !== undefined && (cert_end >= now) )
    {
      result.userid           = license.userid
      result.idcardno         = license.identitynumber
      result.careertype       = license.usertype
      result.licensetype      = license.usertype
      result.licenseno        = license.certificateno
      result.licensestartdate = license.certificatestartdate
      result.licenseenddate   = license.certificateenddate
      result.firstnameth      = license.nameth
      result.lastnameth       = license.lastnameth
      result.firstnameen      = license.nameen
      result.lastnameen       = license.lastnameen
      result.passportno       = license.passportno
      result.sex              = license.genderid
      result.birthdate        = birthdate
    }
  })

  return result 
}