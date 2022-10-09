import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  KspFormBaseComponent,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  EduOccupyList,
  RequestProcess,
  RequestStatus,
  SchoolRequestProcess,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { MatTooltipModule } from '@angular/material/tooltip';

@UntilDestroy()
@Component({
  selector: 'ksp-school-request-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './request-search.component.html',
  styleUrls: ['./request-search.component.scss'],
  providers: providerFactory(RequestSearchComponent),
})
export class RequestSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    requesttype: ['3', Validators.required],
    requestno: [''],
    careertype: [''],
    name: [''],
    idcardno: [''],
    passportno: [''],
    process: [''],
    status: [''],
    requestdatefrom: [''],
    requestdateto: [''],
    schoolid: [''],
    offset: [''],
    row: [''],
  });

  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<Partial<SchRequestSearchFilter>>();
  @Input() disableRequestType = false;
  @Input() requestTypeList = SchoolRequestType;

  eduOccupyList = EduOccupyList;
  processList: RequestProcess[] = [];
  statusList?: RequestStatus[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );

    this.form.controls.requesttype.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((requestType) => {
        // update subtype list
        if (requestType !== '3') {
          this.form.controls.careertype.disable();
        } else {
          this.form.controls.careertype.enable();
        }

        // update process list
        this.processList = SchoolRequestProcess.filter((i) => {
          return `${i.requestType}` === requestType;
        });
      });

    this.form.controls.process.valueChanges.subscribe((currentProcess) => {
      this.statusList = this.processList.find(
        (p) => `${p.processId}` === currentProcess
      )?.status;
      //console.log('status list = ', this.statusList);
    });
  }

  ngOnInit(): void {
    if (this.disableRequestType) {
      this.form.controls.requesttype.disable();
    }
  }
}
