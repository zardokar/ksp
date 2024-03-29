import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UniInfoService } from '@ksp/shared/service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-search',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './degree-search.component.html',
  styleUrls: ['./degree-search.component.scss'],
  providers: providerFactory(DegreeSearchComponent),
})
export class DegreeSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    institution: [null],
    affiliation: [null],
    degreeCode: [null],
    degreeName: [null],
    degreeLevel: [null],
    openYear: [null],
    requestNumber: [null],
    requestsubmitDate: [null],
  });
  universityList: Array<any> = [];
  universityTypeList: Array<any> = [];
  degreeLevelList: Array<any> = [];

  @Input() uniUniversityOption: Array<any> = [];
  @Input() uniUniversityTypeOption: Array<any> = [];
  @Input() disableSelectUni = true;
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();
  @Output() getUniversity = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private uniInfoService: UniInfoService) {
    super();
    this.getDegreeLevel();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  getDegreeLevel() {
    this.uniInfoService.uniDegreeLevel().subscribe(response=>{
      if (response) {
        this.degreeLevelList = response;
      }
    })
  }

  handleGetUniByType() {
    const { affiliation } = this.form.getRawValue();
    this.getUniversity.emit(affiliation)
  }

}
