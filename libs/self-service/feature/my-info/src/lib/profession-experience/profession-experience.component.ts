import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormMode, SelfMyInfo } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  MyInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { replaceEmptyWithNull } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-profession-experience',
  templateUrl: './profession-experience.component.html',
  styleUrls: ['./profession-experience.component.scss'],
})
export class ProfessionExperienceComponent implements OnInit {
  label = 'แก้ไขข้อมูล';
  mode: FormMode = 'view';

  info = [
    { name: 'สำเนาใบรายงานผลการศึกษา (transcript)', fileid: '', filename: '' },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      fileid: '',
      filename: '',
    },
    { name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง', fileid: '', filename: '' },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      fileid: '',
      filename: '',
    },
    { name: 'สำเนาตารางสอนรายสัปดาห์  ', fileid: '', filename: '' },
    { name: 'สำเนาคำสั่งแต่งตั้งปฏิบัติหน้าที่', fileid: '', filename: '' },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      fileid: '',
      filename: '',
    },
  ];
  form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
  });
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  bureau$!: Observable<any>;
  provinces1$!: Observable<any>;
  countries$!: Observable<any>;
  licenses$!: Observable<any>;
  baseForm = this.fb.group(new SelfMyInfo());
  mapping: { [key: number]: any } = {
    0: this.licenseInfo1,
    1: this.licenseInfo2,
    2: this.licenseInfo3,
  };
  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private educationDetailService: EducationDetailService,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.countries$ = this.addressService.getCountry();
    this.bureau$ = this.educationDetailService.getBureau();
    this.provinces1$ = this.addressService.getProvinces();
    this.licenses$ = this.educationDetailService.getLicenseType();
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      const experienceinfo = JSON.parse(res.experienceinfo as string);
      let index = 0;
      for (const key in experienceinfo) {
        if (key == 'fileList') continue;
        for (let i = 0; i < experienceinfo[key].length; i++) {
          this.addFormArray(index);
        }
        index++;
      }
      this.patchFileId(this.info, experienceinfo.fileList);
      this.form.patchValue(experienceinfo);
    });
    this.form.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
  }

  setDefaulFormValue() {
    this.addFormArray(0);
    this.addFormArray(1);
    this.addFormArray(2);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(index: number) {
    const form = this.mapping[index];
    const data = this.fb.group({ licenseForm: [''] });
    form.push(data);
  }

  get licenseInfo1() {
    return this.form.controls['licenseInfo1'] as FormArray;
  }

  get licenseInfo2() {
    return this.form.controls['licenseInfo2'] as FormArray;
  }

  get licenseInfo3() {
    return this.form.controls['licenseInfo3'] as FormArray;
  }

  clear() {
    this.form.reset();
  }

  onSave() {
    if (this.mode === 'view') {
      this.mode = 'edit';
      this.label = 'บันทึกข้อมูล';
    } else {
      this.mode = 'view';
      this.label = 'แก้ไขข้อมูล';
      const formData = this.form.value;
      const fileList = this.mapFileInfo(this.info);
      //console.log(fileList);
      this.baseForm.patchValue({
        experienceinfo: JSON.stringify({ ...formData, fileList: fileList }),
      });
      const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
      this.myInfoService
        .updateMyInfo(payload)
        .subscribe((res) => console.log(res));
    }
  }

  public provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      }
    }
  }

  public amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      }
    }
  }
  mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileid || null,
        filename: file.filename || null,
      };
      return object;
    });
  }
  patchFileId(fileList: any, tab: any) {
    for (let i = 0; i < fileList.length; i++) {
      fileList[i].fileid = tab[i]?.fileid;
      fileList[i].filename = tab[i]?.filename;
    }
    return fileList;
  }
}
