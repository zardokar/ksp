import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent, University } from '@ksp/shared/interface';
import { SchoolLicenseService } from '@ksp/shared/service';
import { zutils } from '@ksp/shared/utility'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-qualification-approve-detail',
  standalone: true,
  templateUrl: './qualification-approve-detail.component.html',
  styleUrls: ['./qualification-approve-detail.component.scss'],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
})
export class QualificationApproveDetailComponent extends KspFormBaseComponent implements OnInit, AfterViewInit
{
  edu2_degreename  = ''
  edu3_degreename  = ''
  edu4_degreename  = ''
  institutname     = '';
  degreeLevelName  = '';
  degreelevelMapping = new Map([
    ['1', 'ปริญญาตรี'],
    ['2', 'ปริญญาโท'],
    ['3', 'ปริญญาเอก'],
    ['4', 'วุฒิการศึกษาปริญญาอื่นๆที่เทียบเท่าปริญญาตรี / ปริญญาทางการศึกษา'],
  ]);
  universityList$!: Observable<University[]>;

  override form = this.fb.group({
    degree: [null, Validators.required],
    degreename: [],
    major: [],
    institute: new FormControl(''),
    edu2_major: [],
    edu2_institute: [],
    edu2_degreename: [],
    edu3_major: [],
    edu3_institute: [],
    edu3_degreename: [],
    edu4_major: [],
    edu4_institute: [],
    edu4_degreename: [],
    reason1: [],
    reason2: [],
    reason2_1: [],
    reason2_2: [],
    reason2_3: [],
  });

  @Input() set otherReason(value: any) {
    console.log('value = ', value);
    if (value) this.form.patchValue(value);
  }

  @Output() confirmed = new EventEmitter<boolean>();

  constructor(
    private changedetector: ChangeDetectorRef,
    private licenseService: SchoolLicenseService,
    public dialogRef: MatDialogRef<QualificationApproveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    console.log( this.data )
    const education     = this.data.education;
    const mode          = this.data.mode;
    const otherreason   = this.data?.otherreason || { degree: '1', reason1: null , reason2_1: null, reason2_2: null, reason2_3: null   }

    const eduData: any  = {
      degree: otherreason.degree,
      major: this.data?.education?.major,
      institute: education.institution,
      degreename: this.data?.education?.degreeName,

      edu2_major : this.data?.educations?.edu2.major,
      edu2_institute : this.data?.educations?.edu2.institution,
      edu2_degreename : this.data?.educations?.edu2.degreeName,

      edu3_major : this.data?.educations?.edu3.major,
      edu3_institute : this.data?.educations?.edu3.institution,
      edu3_degreename : this.data?.educations?.edu3.degreeName,

      edu4_major : this.data?.educations?.edu4.major,
      edu4_institute : this.data?.educations?.edu4.institution,
      edu4_degreename : this.data?.educations?.edu4.degreeName,

      reason1 : otherreason.reason1,
      reason2_1 : otherreason.reason2_1,
      reason2_2 : otherreason.reason2_2,
      reason2_3 : otherreason.reason2_3
    };

    this.edu2_degreename = eduData.edu2_degreename || null
    this.edu3_degreename = eduData.edu3_degreename || null
    this.edu4_degreename = eduData.edu4_degreename || null

    this.form.patchValue(eduData);

    if (mode == 'view') {
      setTimeout(() => {
        this.form.disable();
      }, 0);
    } else {
      //this.form.controls.degree.disable();
      this.form.controls.degreename.disable();
      this.form.controls.major.disable();
      this.form.controls.institute.disable();

      this.form.controls.edu2_major.disable();
      this.form.controls.edu2_institute.disable();
      this.form.controls.edu2_degreename.disable();

      this.form.controls.edu3_major.disable();
      this.form.controls.edu3_institute.disable();
      this.form.controls.edu3_degreename.disable();

      this.form.controls.edu4_major.disable();
      this.form.controls.edu4_institute.disable();
      this.form.controls.edu4_degreename.disable();

      // this.form.controls.reason1.disable();
      // this.form.controls.reason2_1.disable();
      // this.form.controls.reason2_2.disable();
      // this.form.controls.reason2_3.disable();
    }

    this.degreeLevelName =
      this.degreelevelMapping.get(education?.degreeLevelName) ??
      'วุฒิการศึกษาปริญญาตรี';
  }

  ngAfterViewInit(): void {
    this.getInstitute(this.data.education?.institution);
    this.changedetector.detectChanges();
  }

  save() {
    this.dialogRef.close({ otherreason: this.form.getRawValue() });
    console.log( this.form.getRawValue() )
  }

  onClickCheckBox(event : any)
  {
    if( event.target.value === "true")
    {
      event.target.value = "false"
    }else{
      event.target.value = "true"
    }
  }

  getInstitute(insdata: string)
  {
    try {
          const insconv = parseInt( insdata )
          if(isNaN(insconv) === false)
          {
            this.licenseService.getUniversityList().subscribe( res => {
              this.institutname = res[insconv].name ;
              this.form.get('institute')?.setValue(this.institutname);
            })
          }
    }catch(excp){ 
          console.log(excp); 
          this.form.get('institute')?.setValue(insdata);
    }
  }
}
