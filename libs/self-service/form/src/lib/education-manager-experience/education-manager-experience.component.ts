import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, pairwise } from 'rxjs';
import { providerFactory } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'self-service-education-manager-experience',
  templateUrl: './education-manager-experience.component.html',
  styleUrls: ['./education-manager-experience.component.scss'],
  providers: providerFactory(EducationManagerExperienceComponent),
})
export class EducationManagerExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    hasTeachingExperience: [],
    teachingExperienceYear: [],
    hasManagingExperience: [],
    managingExperienceYear: [],
    hasEducationExperience: [],
    educationExperienceYear: [],
    hasEducationManagingExperience: [],
    educationManagingExperienceYear: [],
    hasLongManagingExperience: [],
    longManagingExperienceYear: [],
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
    // this.form.setValidators(checkboxValidator());

    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.hasTeachingExperience !== next.hasTeachingExperience) {
          if (next.hasTeachingExperience) {
            this.form.controls.teachingExperienceYear.addValidators([
              Validators.required,
              Validators.min(8),
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
              Validators.min(3),
            ]);
          } else {
            this.form.controls.managingExperienceYear.clearValidators();
          }
          this.form.controls.managingExperienceYear.updateValueAndValidity();
        }

        if (prev.hasEducationExperience !== next.hasEducationExperience) {
          if (next.hasEducationExperience) {
            this.form.controls.educationExperienceYear.addValidators([
              Validators.required,
              Validators.min(3),
            ]);
          } else {
            this.form.controls.educationExperienceYear.clearValidators();
          }
          this.form.controls.educationExperienceYear.updateValueAndValidity();
        }

        if (
          prev.hasEducationManagingExperience !==
          next.hasEducationManagingExperience
        ) {
          if (next.hasEducationManagingExperience) {
            this.form.controls.educationManagingExperienceYear.addValidators([
              Validators.required,
              Validators.min(5),
            ]);
          } else {
            this.form.controls.educationManagingExperienceYear.clearValidators();
          }
          this.form.controls.educationManagingExperienceYear.updateValueAndValidity();
        }

        if (prev.hasLongManagingExperience !== next.hasLongManagingExperience) {
          if (next.hasLongManagingExperience) {
            this.form.controls.longManagingExperienceYear.addValidators([
              Validators.required,
              Validators.min(8),
            ]);
          } else {
            this.form.controls.longManagingExperienceYear.clearValidators();
          }
          this.form.controls.longManagingExperienceYear.updateValueAndValidity();
        }
      });
  }

  get teachingYear() {
    return this.form.controls.teachingExperienceYear;
  }

  get managingYear() {
    return this.form.controls.managingExperienceYear;
  }

  get educationYear() {
    return this.form.controls.educationExperienceYear;
  }

  get educationManagingYear() {
    return this.form.controls.educationManagingExperienceYear;
  }

  get longManagingYear() {
    return this.form.controls.longManagingExperienceYear;
  }
}
