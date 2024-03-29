import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMode, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-course-consider',
  templateUrl: './course-consider.component.html',
  styleUrls: ['./course-consider.component.css'],
  providers: providerFactory(CourseConsiderComponent),
})
export class CourseConsiderComponent
  extends KspFormBaseComponent
  implements OnInit
{
  totalCredit = 0;
  totalStudent = 0;
  totalStudentResult = 0;
  creditSums: number[] = [0, 0, 0];
  yearSums: number[] = [0, 0, 0, 0, 0, 0];
  planSums: number[] = [0, 0, 0, 0];
  newPlanSums: number[] = [0, 0, 0];
  contactForm?: FormGroup;
  _degreeType = '';
  @Input() set degreeType(degreeType: any) {
    switch (degreeType) {
      case 'a': {
        this.addData();
        break;
      }
      case 'b': {
        this.addDataTypeB();
        break;
      }
      default: {
        break;
      }
    }
    this._degreeType = degreeType;
  }
  get degreeType(): any {
    return this._degreeType;
  }
  @Input() showSector1 = true;
  @Input() showSector2 = true;
  @Input() showOldPlan = true;
  calendaryearList: Array<any> = [];

  override form = this.fb.group({
    subject1GroupName: [''],
    subject2GroupName: [''],
    subject3GroupName: [''],
    plans: this.fb.array([this.newPlan(1)]),
    plansResult: this.fb.array([this.newPlanResult(1)]),
    subjects: this.fb.array([this.newSubject('วิชาการศึกษาทั่วไป')]),
  });

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
    const currYear = new Date().getFullYear() + 10;
    for (let index = 0; index <= 20; index++) {
      this.calendaryearList.push({
        value: (currYear - index + 543).toString(),
        label: (currYear - index + 543).toString(),
      });
    }
  }

  sum(source: any[], data: string): number {
    return source.reduce((p, c) => p + Number(c[data]), 0);
  }

  calculateSum() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      if (this.degreeType == 'a') {
        if (res.subjects) {
          this.totalCredit = this.sum(res.subjects, 'credit');
        }

        if (res.plans) {
          this.totalStudent = this.sum(res.plans, 'student');
        }

        if (res.plansResult) {
          this.totalStudentResult = this.sum(res.plansResult, 'student');
        }
      } else {
        if (res.subjects) {
          this.creditSums[0] = this.creditSum(res.subjects, 'credit1');
          this.creditSums[1] = this.creditSum(res.subjects, 'credit2');
          this.creditSums[2] = this.creditSum(res.subjects, 'credit3');
        }
        if (res.plans) {
          this.planSums[0] = this.creditSum(res.plans, 'student1');
          this.planSums[1] = this.creditSum(res.plans, 'student2');
          this.planSums[2] = this.creditSum(res.plans, 'student3');
          this.planSums[3] =
            this.planSums[0] + this.planSums[1] + this.planSums[2];
          const results = this.form.controls.plansResult.getRawValue() as any;
          this.newPlanSums[0] = results.reduce(
            (p: any, c: any) => p + Number(c['student1']),
            0
          );
          this.newPlanSums[1] = results.reduce(
            (p: any, c: any) => p + Number(c['student2']),
            0
          );
          this.newPlanSums[2] = results.reduce(
            (p: any, c: any) => p + Number(c['student3']),
            0
          );
          res.plans.forEach((i, index) => {
            const { label, year, ...newData } = i as any;
            let sum = 0;
            for (const property in newData) {
              sum += Number(newData[property]);
            }
            this.yearSums[index] = sum;
            // this.yearSums[index] = Number(i.student1) + Number(i.student2) + Number(i.student3);
          });
        }
      }
    });
  }

  creditSum(source: any[], data: string): number {
    return source.reduce((p, c) => p + Number(c[data]), 0);
  }

  get plans() {
    return this.form.controls['plans'];
  }

  get plansResult() {
    return this.form.controls['plansResult'];
  }

  get subjects() {
    return this.form.controls['subjects'];
  }

  async addDataTypeB() {
    const subjects = await [
      this.newSubject('หมวดวิชาเลือก'),
      this.newSubject('วิทยานิพนธ์'),
      this.newSubject('การค้นคว้าอิสระ'),
      this.newSubject('รายวิชาเสริม'),
      this.newSubject('วิชาอื่นๆ'),
    ];

    const plans = [
      this.newPlan(2),
      this.newPlan(3),
      this.newPlan(4),
      this.newPlan(5),
    ];

    const plansResult = [
      this.newPlanResult(2),
      this.newPlanResult(3),
      this.newPlanResult(4),
      this.newPlanResult(5),
    ];

    plans.forEach((p) => this.plans.push(p));
    plansResult.forEach((pr) => this.plansResult.push(pr));
    await subjects.forEach((s) => this.subjects.push(s));
    if (this.mode === 'view') this.form.disable();
    this.calculateSum();
  }

  async addData() {
    const subjects = await [
      this.newSubject('วิชาชีพครู : ภาคทฤษฎีและปฏิบัติ'),
      this.newSubject('วิชาชีพครู : ฝึกปฏิบัติวิชาชีพระหว่างเรียน'),
      this.newSubject(
        'วิชาชีพครู : ปฏิบัติการสอนในสถานศึกษา / การบริหารสถานศึกษา'
      ),
      this.newSubject('วิชาเอกแรก'),
      this.newSubject('วิชาเอกที่สองหรือวิชาโท'),
      this.newSubject('วิชาเลือกเสรี'),
      this.newSubject('วิชาเอก'),
    ];

    const plans = [
      this.newPlan(2),
      this.newPlan(3),
      this.newPlan(4),
      this.newPlan(5),
    ];

    const plansResult = [
      this.newPlanResult(2),
      this.newPlanResult(3),
      this.newPlanResult(4),
      this.newPlanResult(5),
    ];

    plans.forEach((p) => this.plans.push(p));
    plansResult.forEach((pr) => this.plansResult.push(pr));
    await subjects.forEach(async (s) => await this.subjects.push(s));
    if (this.mode === 'view') this.form.disable();
    this.calculateSum();
  }

  newPlan(year: number) {
    return this.fb.group({
      label: 'แผนฯ ปีที่ ' + year,
      student: [''],
      year: [undefined],
      planname: [''],
      student1: [''],
      student2: [''],
      student3: [''],
      planname1: [''],
      planname2: [''],
      planname3: [''],
    });
  }

  newPlanResult(year: number) {
    return this.fb.group({
      label: 'แผนฯ ปีที่ ' + year,
      student: [''],
      year: [undefined],
      consider: [false],
      planname: [''],
      student1: [''],
      student2: [''],
      student3: [''],
      planname1: [''],
      planname2: [''],
      planname3: [''],
    });
  }

  newSubject(data: string) {
    return this.fb.group({
      label: data,
      credit: [''],
      credit1: [''],
      credit2: [''],
      credit3: [''],
    });
  }

  setCheckedData(event: any, index: any) {
    if (!this.plansResult.at(index).value.consider) {
      this.plansResult.at(index).patchValue({
        year: this.plans.at(index).value.year || null,
        student: this.plans.at(index).value.student || null,
      });
    } else {
      this.plansResult.at(index).patchValue({
        year: null,
        student: null,
      });
    }
  }

  setCheckedDataB(event: any, index: any) {
    if (!this.plansResult.at(index).value.consider) {
      this.plansResult.at(index).patchValue({
        year: this.plans.at(index).value.year || null,
        student1: this.plans.at(index).value.student1 || null,
        student2: this.plans.at(index).value.student2 || null,
        student3: this.plans.at(index).value.student3|| null,
      });
    } else {
      this.plansResult.at(index).patchValue({
        year: null,
        student1: null,
        student2: null,
        student3: null,
      });
    }
  }
}
