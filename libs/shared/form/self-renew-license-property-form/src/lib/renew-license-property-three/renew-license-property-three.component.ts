import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-renew-license-property-three',
  templateUrl: './renew-license-property-three.component.html',
  styleUrls: ['./renew-license-property-three.component.scss'],
  providers: providerFactory(RenewLicensePropertyThreeComponent),
})
export class RenewLicensePropertyThreeComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() formType: 'sch' | 'edu' | 'sup' = 'sch';
  @Input() eduType: 'bachelor' | 'other' = 'bachelor';

  override form = this.fb.group({
    degree: [null, Validators.required],
    managingDegree: [null, Validators.required],
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

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }
}
