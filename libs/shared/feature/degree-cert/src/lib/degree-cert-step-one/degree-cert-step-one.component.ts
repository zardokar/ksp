import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  CourseFormFourComponent,
  CourseFormOneComponent,
  CourseFormThreeComponent,
  CourseFormTwoComponent,
} from '@ksp/shared/form/uni-course-form';
import { DynamicComponent, ListData } from '@ksp/shared/interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-degree-cert-step-one',
  templateUrl: './degree-cert-step-one.component.html',
  styleUrls: ['./degree-cert-step-one.component.css'],
})
export class DegreeCertStepOneComponent implements OnInit {
  courseTypes: ListData[] = [];
  degreeTypes: ListData[] = [];

  @Input() isViewForm = false;
  @Output() degreeType = new EventEmitter<number>();
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  step1Form = this.fb.group({
    degreeType: [''],
    courseType: [''],
    locations: this.fb.array([]),
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseTypes = courseTypes;
    this.degreeTypes = degreeTypes;

    this.step1Form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      console.log('form value = ', res);
    });

    this.step1Form.controls['courseType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });

    this.step1Form.controls['degreeType'].valueChanges.subscribe((res) => {
      this.degreeType.emit(Number(res));
    });

    this.addLocation();
  }

  get locations() {
    return this.step1Form.controls['locations'] as FormArray;
  }

  addLocation() {
    const locationForm = this.fb.group({
      title: [''],
    });

    this.locations.push(locationForm);
  }

  loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(componentList[index]);
  }
}

const degreeTypes: ListData[] = [
  {
    value: 0,
    label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
  },
  {
    value: 1,
    label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
  },
  {
    value: 2,
    label: 'ประกาศนียบัตรบัณฑิตทางการศึกษา (วิชาชีพครู)',
  },
  {
    value: 3,
    label: 'ประกาศนียบัตรบัณฑิตทางการศึกษา (วิชาชีพบริหาร)',
  },
  {
    value: 4,
    label: 'ปริญญาโททางการศึกษา (วิชาชีพครู)',
  },
  {
    value: 5,
    label: 'ปริญญาโททางการศึกษา (วิชาชีพบริหาร)',
  },
  {
    value: 6,
    label: 'ปริญญาเอกทางการศึกษา (วิชาชีพครู)',
  },
  {
    value: 7,
    label: 'ปริญญาเอกทางการศึกษา (วิชาชีพบริหาร)',
  },
];

const courseTypes: ListData[] = [
  {
    value: 0,
    label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
  },
  {
    value: 1,
    label: 'เอกเดี่ยว กรณีไม่มีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
  },
  {
    value: 2,
    label: 'เอกเดี่ยว กรณีมีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
  },
  {
    value: 3,
    label: 'เอกคู่',
  },
  {
    value: 4,
    label: 'เอก-โท',
  },
];

const componentList = [
  CourseFormOneComponent,
  CourseFormTwoComponent,
  CourseFormThreeComponent,
  CourseFormFourComponent,
  CourseFormOneComponent,
];
