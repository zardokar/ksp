import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, pairwise } from 'rxjs';
import { providerFactory } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'self-service-study-supervision-experience',
  templateUrl: './study-supervision-experience.component.html',
  styleUrls: ['./study-supervision-experience.component.scss'],
  providers: providerFactory(StudySupervisionExperienceComponent),
})
export class StudySupervisionExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    hasTeachingExperience: [],
    teachingExperienceYear: [],
    hasManagingExperience: [],
    managingExperienceYear: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.hasTeachingExperience !== next.hasTeachingExperience) {
          if (next.hasTeachingExperience) {
            this.form.controls.teachingExperienceYear.addValidators([
              Validators.required,
              Validators.min(5),
            ]);
          } else {
            this.form.controls.teachingExperienceYear.clearValidators();
          }
          this.form.controls.teachingExperienceYear.updateValueAndValidity();
        }

        if (prev.hasManagingExperience !== next.hasManagingExperience) {
          if (next.hasManagingExperience) {
            this.form.controls.managingExperienceYear.addValidators([
              Validators.required,
              Validators.min(5),
            ]);
          } else {
            this.form.controls.managingExperienceYear.clearValidators();
          }
          this.form.controls.managingExperienceYear.updateValueAndValidity();
        }
        //console.log('exp form = ', res);
      });
  }

  get teachingYear() {
    return this.form.controls.teachingExperienceYear;
  }

  get managingYear() {
    return this.form.controls.managingExperienceYear;
  }
}
