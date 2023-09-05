import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import {
  defaultSubcommittee,
  defaultMeeting,
  EhicsMeeting,
  EhicsSubcommittee,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { BottomNavComponent } from '@ksp/shared/menu';
import { GeneralInfoService } from '@ksp/shared/service';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { InquiryConsiderRecordComponent } from '@ksp/e-service/dialog/inquiry-consider-record';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'e-service-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatIconModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: providerFactory(InquiryDetailComponent),
})
export class InquiryDetailComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    inquiryorderno: [],
    inquiryorderdate: [],
    inquirysubcommittee: this.fb.array([] as FormGroup[]),
    inquiryexplaindate: [],
    inquiryjbdate: [],
    inquiryreport: [],
    inquiryfile: [],
    inquerymeetinghistory: this.fb.array([] as FormGroup[]),
    inquiryresult: this.fb.group({
      considertimes: [],
      considerdate: [],
      considerreason: [],
      considerday: [],
      considerdatefrom: [],
      considerdateto: [],
      consider: [],
      otherreason: [],
    }),
  });
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngOnInit(): void {
    this.getListData();
  }
  get meetings() {
    return this.form.controls.inquerymeetinghistory as FormArray;
  }
  get members() {
    return this.form.controls.inquirysubcommittee as FormArray;
  }

  next() {
    this.router.navigate(['/', 'ethics', 'inquiry', 'result']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'inquiry']);
  }
  addRow(data: EhicsSubcommittee = defaultSubcommittee) {
    const rewardForm = this.fb.group({
      idcardno: data.idcardno,
      idnumber: data.idnumber,
      positioncommittee: data.positioncommittee,
      prefix: data.prefix,
      firstname: data.firstname,
      lastname: data.lastname,
      position: data.position,
      bureau: data.bureau,
    });
    this.members.push(rewardForm);
  }
  deleteRow(index: number) {
    this.members.removeAt(index);
  }
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }
  addConsiderRow(data: EhicsMeeting = defaultMeeting) {
    let getdate = new Date( data?.meetingdate || '')
    const rewardForm = this.fb.group({
      meetingtimes: data.meetingtimes,
      meetingdate: thaiDate(new Date(getdate )) ,
      meetingreason: data.meetingreason,
      meetingfile: data.meetingfile
    });
    this.meetings.push(rewardForm);
  }
  deleteConsiderRow(index: number) {
    this.meetings.removeAt(index);
  }

  openCondiserRecordDialog() {
    const dialogRef = this.dialog.open(InquiryConsiderRecordComponent, {
      height: '50vh',
      width: '50vw',
      position: {
        top: '25vh',
        right: '25vw',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("after Close ::: ",result);
      if(result !== ""){
      this.addConsiderRow(result)
      }
      // this.selectId = result
      // this.addressId = result
      // this.updateStatus = true
    });
  }

}
