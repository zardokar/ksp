import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-degree-cert-step-3',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
  providers: providerFactory(DegreeCertStepThreeComponent),
})
export class DegreeCertStepThreeComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    training: [],
    teaching: [],
    section1: [false],
    section2: [false],
  });

  @Input() showEditCheckbox = false;
  @Input() step3Incorrect = [];

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
  get section1() {
    return !!(!this.form.controls?.section1?.value && this.showEditCheckbox) || this.mode === 'view'
  }
  get section2() {
    return !!(!this.form.controls?.section2?.value && this.showEditCheckbox) || this.mode === 'view'
  }
}
