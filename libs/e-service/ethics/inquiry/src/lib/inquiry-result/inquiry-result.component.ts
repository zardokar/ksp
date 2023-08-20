import { CommonModule } from '@angular/common';
import { Component , ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import {
  defaultMeeting,
  EhicsMeeting,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule , FormGroup , FormArray} from '@angular/forms';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InquiryDetailComponent } from '../inquiry-detail/inquiry-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { InquiryConsiderRecordComponent } from '@ksp/e-service/dialog/inquiry-consider-record';

@Component({
  selector: 'e-service-inquiry-result',
  templateUrl: './inquiry-result.component.html',
  styleUrls: ['./inquiry-result.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
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
  providers: providerFactory(InquiryResultComponent),
})
export class InquiryResultComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    resultredno: [],
    resultblackno:[],
    resultcomitteeno: [],
    resultcomitteedate: [],
    resultcomitteefile: [],
    resulttoaccuserdate: [],
    resulttoaccuserfile: [],
    resulttoschooldate: [],
    resulttoschoolfile: [],
    resulttoaccuseddate: [],
    resulttoaccusedfile: [],
    resultdetail:[],
    resultstartsuspendlicensedate:[],
    resultendsuspendlicensedate:[],
    resulttoaccusednotificationdate:[],
    resultacademicname:[],
    resultaffiliationname:[],
    resulttoschoolnotificationdate:[],
    inquerymeetinghistory: this.fb.array([] as FormGroup[]),
  });
  today = thaiDate(new Date());
  requestNumber = '';
  constructor(private router: Router, private fb: FormBuilder , public dialog: MatDialog,) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  @ViewChild(InquiryDetailComponent)
  inquiry!: InquiryDetailComponent;


  get meetings() {
    return this.form.controls.inquerymeetinghistory as FormArray;
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
