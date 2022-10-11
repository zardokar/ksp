import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-foreign-license-step-three',
  templateUrl: './foreign-license-step-three.component.html',
  styleUrls: ['./foreign-license-step-three.component.scss'],
  providers: providerFactory(ForeignLicenseStepThreeComponent),
})
export class ForeignLicenseStepThreeComponent
  extends KspFormBaseComponent
  implements OnChanges
{
  @Input() documentTypes: 'request' | 'renew' = 'request';
  @Input() uniqueTimestamp = '';
  @Input() attachFiles: any[] = [];

  override form = this.fb.group({
    checkFiles: this.fb.array([]),
  });

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      const control = this.form.get(key) as FormArray;
      if (value[key]?.length) {
        if (!this.form.controls.checkFiles.value?.length) {
          value[key].forEach((value: any) => {
            control.push(this.fb.control(value));
          });
          console.log(control.value);
        } else {
          value[key].forEach((value: any, index: any) => {
            control.at(index)?.patchValue(value);
          });
        }
      }
    });
    this.form.controls.checkFiles.updateValueAndValidity();
    this.onChange(value);
    this.onTouched();
  }

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

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['attachFiles'] && this.attachFiles?.length) {
      if (!this.form.controls.checkFiles.value?.length) {
        this.attachFiles.forEach((file) =>
          this.form.controls.checkFiles.push(this.fb.control(false))
        );
      }
    }
  }

  updateComplete(file: any, group: any) {
    const { fileid, filename } = file;
    group.fileid = fileid;
    group.filename = filename;
  }
}
