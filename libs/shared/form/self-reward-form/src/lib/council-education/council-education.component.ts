import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-council-education',
  templateUrl: './council-education.component.html',
  styleUrls: ['./council-education.component.scss'],
  providers: providerFactory(CouncilEducationComponent),
})
export class CouncilEducationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() countries: any[] = [];

  override form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
    licenseInfo4: this.fb.array([]),
    licenseInfo5: this.fb.array([]),
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
    this.form.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
  }

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      const control = this.form.get(key) as FormArray;
      value[key].forEach((item: any) =>
        control.push(
          this.fb.group({
            ...item,
          })
        )
      );
    });

    this.onChange(value);
    this.onTouched();
  }

  setDefaulFormValue() {
    this.addFormArray(this.licenseInfo1, 1);
    this.addFormArray(this.licenseInfo2, 2);
    this.addFormArray(this.licenseInfo3, 3);
    this.addFormArray(this.licenseInfo4, 4);
    this.addFormArray(this.licenseInfo5, 5);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>, formNumber: number) {
    let data;
    if (formNumber === 5) {
      data = this.fb.group({
        certificationType: [null, Validators.required],
        recognizedOrganization: [null, Validators.required],
        certificateNo: [null, Validators.required],
        issueDate: [null, Validators.required],
      });
    } else {
      data = this.fb.group({
        licenseForm: [null, Validators.required],
      });
    }

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

  get licenseInfo4() {
    return this.form.controls['licenseInfo4'] as FormArray;
  }

  get licenseInfo5() {
    return this.form.controls['licenseInfo5'] as FormArray;
  }
}
