import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-four',
  templateUrl: './renew-license-property-four.component.html',
  styleUrls: ['./renew-license-property-four.component.scss'],
  providers: providerFactory(RenewLicensePropertyFourComponent),
})
export class RenewLicensePropertyFourComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    otherDegree: [null, Validators.required],
    transferCount: [null, Validators.required],
    trainCount: [null, Validators.required],
    testCount: [null, Validators.required],
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
}
