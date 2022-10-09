import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-standard-working',
  templateUrl: './standard-working.component.html',
  styleUrls: ['./standard-working.component.scss'],
  providers: providerFactory(StandardWorkingComponent),
})
export class StandardWorkingComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() educationType:
    | 'teacher'
    | 'schManager'
    | 'eduManager'
    | 'supervision' = 'teacher';
  @Input() uniqueTimestamp = '';

  selectedEducationType!: number;
  @Input() workingInfo: any[] = [];

  override form = this.fb.group({
    educationType: [null, Validators.required],
    educationLevelForm: [null, Validators.required],
  });

  educationTypes1: ListData[] = [];
  educationTypes2: ListData[] = [];
  educationTypes3: ListData[] = [];
  educationTypes4: ListData[] = [];

  /* @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective; */

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.educationTypes1 = educationTypes1;
    this.educationTypes2 = educationTypes2;
    this.educationTypes3 = educationTypes3;
    this.educationTypes4 = educationTypes4;

    this.form.controls['educationType'].valueChanges
      .pipe(skip(1))
      .subscribe((res) => {
        this.selectedEducationType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }
}

const educationTypes1 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพครู`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพครู`,
  },
];

const educationTypes2 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพผู้บริหารสถานศึกษา`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพผู้บริหารสถานศึกษา`,
  },
];

const educationTypes3 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพผู้บริหารการศึกษา`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพผู้บริหารการศึกษา`,
  },
];

const educationTypes4 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพศึกษานิเทศก์`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพศึกษานิเทศก์`,
  },
];
