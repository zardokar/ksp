import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-academic-archivement',
  templateUrl: './activity-academic-archivement.component.html',
  styleUrls: ['./activity-academic-archivement.component.scss'],
  providers: providerFactory(ActivityAcademicArchivementComponent),
})
export class ActivityAcademicArchivementComponent extends KspFormBaseComponent {
  @Input() data: any;
  @Input() isForeignForm = false;

  override form = this.fb.group({
    isAcademicChecked: [false],
    oldAcademic: [],
    newAcademic: [],
    orderName: [],
    orderNumber: [],
    orderDate: [],
    isPendingAcademicChecked: [false],
    oldPendingAcademic: [],
    newPendingAcademic: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
