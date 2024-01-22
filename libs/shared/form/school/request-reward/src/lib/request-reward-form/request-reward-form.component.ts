import { Component, Input, Output, ChangeDetectorRef,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

import { MatDialog } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileGroup, KspFormBaseComponent } from '@ksp/shared/interface';
import {
  idCardPattern,
  nameThPattern,
  phonePattern,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-request-reward-form',
  standalone: true,
  imports: [
    CommonModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    AddRowButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './request-reward-form.component.html',
  styleUrls: ['./request-reward-form.component.scss'],
  providers: providerFactory(RequestRewardFormComponent),
})
export class RequestRewardFormComponent extends KspFormBaseComponent {
  validatorMessages = validatorMessages;
  @Output() uploadFile = new EventEmitter<any>();
  @Input()  osoiTypes: any = [];
  @Input()  personTypes: any = [];
  @Input()  prefixList: any = [];
  @Input()  uniqueTimeStamp = '';

  @Input()
  set memberList(members: MemberForm[]) {
    //console.log('get members =', members);
    if (members && members.length) {
      members.map((member) => {
        this.addRow(member);
      });
    }
  }

  // ------------------------------------------------

  override form = this.fb.group({
    rewardname: [null, Validators.required],
    rewardtype: [null, Validators.required],
    submitbefore: [null, Validators.required],

    idcardno: [null, [Validators.required]],
    prefixth: [null, Validators.required],
    firstnameth: [
      null,
      [Validators.required],
    ],
    lastnameth: [
      null,
      [Validators.required],
    ],
    contactphone: [
      null,
      [Validators.required],
    ],
    email: [null, [Validators.required, Validators.email]],
    position: [null, Validators.required],

    osoimember: this.fb.array([]),
    vdolink: [''],
    files: [[]]
  });

  rewardFiles: FileGroup[] = OSOI_FILE_GROUP;

  rewards = rewards;

  constructor(public dialog: MatDialog,
              private cdref: ChangeDetectorRef,
              private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();

        // Update from patch
        this.rewardFiles = this.form.controls.files.value || OSOI_FILE_GROUP
      })
    );
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  override ngOnChanges(event: any): void {
    console.log( `ngOnChanges`,event )
  }

  // --------------------------------------------------

  get members() {
    return this.form.controls.osoimember as FormArray;
  }

  addRow(data: MemberForm = defaultMember) {
    const rewardForm = this.fb.group({
      membertype: [data.membertype, Validators.required],
      idcardno: [
        data.idcardno,
        [Validators.required],
      ],
      prefix: [data.prefix, Validators.required],
      firstname: [
        data.firstname,
        [Validators.required],
      ],
      lastname: [
        data.lastname,
        [Validators.required],
      ],
      phone: [
        data.phone,
        [Validators.required],
      ],
      email: [data.email, [Validators.required, Validators.email]],
      isCoordinator: []
    });

    //console.log('reward form = ', rewardForm);
    this.members.push(rewardForm);
  }

  onUploadComplete(evt: any) {
    this.form.controls.files.setValue(evt);
    this.uploadFile.emit(evt);
  }

}

export const OSOI_FILE_GROUP = [
  { name: 'แบบนร. 1 + แบบนร. 2 (ถ้ามี) รวมกันไม่เกิน 50 หน้า)', files: [] },
  { name: 'หนังสือนำส่งจากสถานศึกษา/โรงเรียน', files: [] },
]

export const rewards = [
  { label: 'ผลงานนี้ไม่เคยส่งเข้ารับการคัดสรรกับคุรุสภา', value: 1 },
  {
    label: 'ผลงานนี้เคยส่งเข้ารับการคัดสรรกับคุรุสภา แต่ไม่ได้รับรางวัลของคุรุสภา',
    value: 2,
  },
  {
    label: 'ผลงานนี้ได้รับรางวัลของคุรุสภา แต่มีการพัฒนาต่อยอดนวัตกรรม',
    value: 3,
  },
];

const defaultMember: MemberForm = {
  membertype: null,
  idcardno: null,
  prefix: null,
  firstname: null,
  lastname: null,
  phone: null,
  email: null,
};

export interface MemberForm {
  membertype: string | null;
  idcardno: string | null;
  prefix: number | null;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  email: string | null;
}
