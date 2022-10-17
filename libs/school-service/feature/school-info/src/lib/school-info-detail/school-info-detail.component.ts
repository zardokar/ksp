import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Prefix } from '@ksp/shared/interface';
import { SchoolInfoService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-school-info-detail',
  templateUrl: './school-info-detail.component.html',
  styleUrls: ['./school-info-detail.component.scss'],
})
export class SchoolInfoDetailComponent implements OnInit {
  userInfoFormType: number = UserInfoFormType.thai;
  schoolId = '0010201056';
  prefixList$!: Observable<Prefix[]>;

  form = this.fb.group({
    schoolAddrTh: [],
    schoolAddrEn: [],
    schManager: [],
    coordinator: [],
  });

  constructor(
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngOnInit(): void {
    this.getSchoolAddress();
  }

  getSchoolAddress() {
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.form.controls.schoolAddrTh.patchValue(res);
      });
  }
}