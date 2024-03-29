import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-seminar',
  templateUrl: './activity-seminar.component.html',
  styleUrls: ['./activity-seminar.component.scss'],
  providers: providerFactory(ActivitySeminarComponent),
})
export class ActivitySeminarComponent
  extends KspFormBaseComponent
  implements OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  //การเข้าฟังการบรรยาย การอภิปราย การประชุมวิชาการ การประชุมปฏิบัติการ การประชุมสัมมนา หรือการประชุมในรูปแบบอื่นๆที่คุรุใสภาให้การรับรอง
  override form = this.fb.group({
    course: [null, Validators.required],
    trainingAddress: [null, Validators.required],
    trainingAgency: [null, Validators.required],
    dateFrom: [null, Validators.required],
    dateTo: [null, Validators.required],
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
