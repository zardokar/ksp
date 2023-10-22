import { CommonModule } from '@angular/common';
import { Component, OnInit , Input } from '@angular/core';
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
import { UniversitySearchComponent } from '@ksp/shared/search';

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
  @Input() searchType = '';
  @Input() bureaus: any[] = [];
  override form = this.fb.group({
    licensesuspension: [],
    inquerylicensestatus: [],
    inquerylicensestatusnotificationdate:[],
    inquerylicensestatusaccusedrecognizedate:[],
    inquiryorderno: [],
    inquiryorderdate: [],
    inquirysubcommittee: this.fb.array([] as FormGroup[]),
    inquiryexplaindate: [],
    inquiryexaminereport:[],
    inquiryjbdate: [],
    inquiryreport: [],
    inquiryfile: [],
    inquerymeetinghistory: this.fb.array([] as FormGroup[]),
    inquerylicensesuspendnotificationdate:[],
    inquerylicensesuspendrecognizedate:[],
    inquerynotificationdate:[],
    inquiryresult: this.fb.group({
      considertimes: [],
      considerdate: [],
      considerreason: [],
      considerday: this.fb.group({
        year : [],
        month : [],
        day : []
      }),
      considerdatefrom: [],
      considerdateto: [],
      consider: [],
      otherreason: [],
    }),
  });
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  selectedlicensesuspension = false
  
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
      bureauname: data.bureauname,
    });
    this.members.push(rewardForm);
    if(this.mode === 'view'){
      this.members.disable()
    }
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
    if(this.mode === 'view'){
      this.meetings.disable()
    }
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

  searchSchool(target:any) {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        searchType: this.searchType,
        subHeader: 'กรุณาเลือกหน่วยงาน/สถานศึกษาที่ท่านสังกัด'
      },
    });
    dialog.afterClosed().subscribe((res: any) => {
      console.log(res);
      // const bureau = this.bureaus.find( (bureau : any[any]) => { return bureau.bureauId === res.bureauid}) 
      // if(bureau === undefined)
      // {
      //   this.bureaus.push({
      //     bureauId : res.bureauid,
      //     bureauName : res.bureauname
      //   })
      // }

      const grpind =  parseInt( target.getAttribute('grpind') )

      // Assign to element
      target.value = res.bureauname;
      // this.members.controls[grpind].get('affiliation')?.setValue(res.bureauid);
      this.members.controls[grpind].get('bureauname')?.setValue(res.bureauname)
    });
  }

  checkConsiderDay(considerDay:any){
    // let getdata = this.form.controls.considerday.value as any;
    console.log(considerDay) 
    // if(getdata[name] == null){
    //   getdata[name] = true 
    // }else if( !isNaN( getdata[name]) ){
    //   getdata[name] = false 
    // }
    // console.log(getdata);
  }

}
