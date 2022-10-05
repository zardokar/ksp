import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-standard-train-pass',
  templateUrl: './standard-train-pass.component.html',
  styleUrls: ['./standard-train-pass.component.scss'],
  providers: providerFactory(StandardTrainPassComponent),
})
export class StandardTrainPassComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() isForeignForm = false;

  override form = this.fb.group({
    date: [null, Validators.required],
    name: [null, Validators.required],
    agency: [null, Validators.required],
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
