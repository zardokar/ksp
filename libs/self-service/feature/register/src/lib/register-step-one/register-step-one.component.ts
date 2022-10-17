import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Amphur,
  Nationality,
  Prefix,
  Province,
  Tambol,
} from '@ksp/shared/interface';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import {
  nameEnPattern,
  nameThPattern,
  phonePattern,
  validatorMessages,
} from '@ksp/shared/utility';
import localForage from 'localforage';
import { Observable } from 'rxjs';
@Component({
  selector: 'self-service-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent implements OnInit {
  prefixList$!: Observable<Prefix[]>;
  nationalitys$!: Observable<Nationality[]>;
  provinces$!: Observable<Province[]>;
  amphurs$!: Observable<Amphur[]>;
  tumbols$!: Observable<Tambol[]>;
  validatorMessages = validatorMessages;
  today = new Date();

  form = this.fb.group({
    prefixth: [null, Validators.required],
    firstnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    lastnameth: [
      null,
      [Validators.required, Validators.pattern(nameThPattern)],
    ],
    prefixen: [null, Validators.required],
    firstnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    lastnameen: [
      null,
      [Validators.required, Validators.pattern(nameEnPattern)],
    ],
    birthdate: [null, Validators.required],
    nationality: ['TH', Validators.required],
    phone: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    addressinfo: [],
    sex: [null, Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces$ = this.addressService.getProvinces();
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  nextPage() {
    localForage.setItem('th-register', this.form.value);
    this.router.navigate(['/register', 'th-step-2']);
  }

  provinceChanged(evt: any) {
    const province = evt.target?.value;
    if (province) {
      console.log('pv vhange = ', evt);
      this.amphurs$ = this.addressService.getAmphurs(province);
    }
  }

  amphurChanged(evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      this.tumbols$ = this.addressService.getTumbols(amphur);
    }
  }

  get firstNameTh() {
    return this.form.controls.firstnameth;
  }

  get lastNameTh() {
    return this.form.controls.lastnameth;
  }

  get firstNameEn() {
    return this.form.controls.firstnameen;
  }

  get lastNameEn() {
    return this.form.controls.lastnameen;
  }

  get phone() {
    return this.form.controls.phone;
  }

  get email() {
    return this.form.controls.email;
  }
}
