import { CommonModule } from '@angular/common';
import { Component , ViewChild , EventEmitter, Input, Output , OnInit } from '@angular/core';
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
  ACCUSATION_FILES,
  defaultMeeting,
  EhicsMeeting,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule , FormGroup , FormArray} from '@angular/forms';
import { providerFactory, thaiDate ,mapFileInfo } from '@ksp/shared/utility';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { InquiryDetailComponent } from '../inquiry-detail/inquiry-detail.component';
import { MatDialog } from '@angular/material/dialog';
// import { InquiryConsiderRecordComponent } from '@ksp/e-service/dialog/inquiry-consider-record';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { Observable } from 'rxjs';

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
export class InquiryResultComponent extends KspFormBaseComponent implements OnInit {
  @Input() searchType = '';
  @Input() bureaus: any[] = [];
  @Output() downloadClick = new EventEmitter<any>();
  @Output() uploadComplete = new EventEmitter<any>();
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
    accusationblackno:[]
    // ccusationFiles: any[] = structuredClone(ACCUSATION_FILES);
    // inquerymeetinghistory: this.fb.array([] as FormGroup[]),
    // inquiryresult: this.fb.group({
    //   considertimes: [],
    //   considerdate: [],
    //   considerreason: [],
    //   considerday: [],
    //   considerdatefrom: [],
    //   considerdateto: [],
    //   consider: [],
    //   otherreason: [],
    // }),
  });
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  disabled = 'edit';
  uniqueTimestamp!: string;
  filename! : string;
  fileid! : string;

  constructor(private router: Router, private fb: FormBuilder , public dialog: MatDialog, private generalInfoService: GeneralInfoService) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  // @ViewChild(InquiryDetailComponent)
  // inquiry!: InquiryDetailComponent;


  // get meetings() {
  //   return this.form.controls.inquerymeetinghistory as FormArray;
  // }

  // addConsiderRow(data: EhicsMeeting = defaultMeeting) {
  //   let getdate = new Date( data?.meetingdate || '')
  //   const rewardForm = this.fb.group({
  //     meetingtimes: data.meetingtimes,
  //     meetingdate: thaiDate(new Date(getdate )) ,
  //     meetingreason: data.meetingreason,
  //     meetingfile: data.meetingfile
  //   });
  //   this.meetings.push(rewardForm);
  // }
  // deleteConsiderRow(index: number) {
  //   this.meetings.removeAt(index);
  // }

  // openCondiserRecordDialog() {
  //   const dialogRef = this.dialog.open(InquiryConsiderRecordComponent, {
  //     height: '50vh',
  //     width: '50vw',
  //     position: {
  //       top: '25vh',
  //       right: '25vw',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log("after Close ::: ",result);
  //     if(result !== ""){
  //     this.addConsiderRow(result)
  //     }
  //     // this.selectId = result
  //     // this.addressId = result
  //     // this.updateStatus = true
  //   });
  // }

  ngOnInit(): void {
    this.getListData();
  }
  

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    // console.log(this.prefixList$)
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
      // const bureau = this.bureaus.find( (bureau : any[any]) => { return bureau.bureauId === res.bureauid}) 
      // if(bureau === undefined)
      // {
      //   this.bureaus.push({
      //     bureauId : res.bureauid,
      //     bureauName : res.bureauname
      //   })
      // }

      // const grpind =  parseInt( target.getAttribute('grpind') )

      // Assign to element
      // target.value = res.bureauname;
      // target.value = res.schoolname;
      // this.members.controls[grpind].get('affiliation')?.setValue(res.bureauid);
      this.form.controls.resultaffiliationname.patchValue(res.bureauname);
      this.form.controls.resultacademicname.patchValue(res.schoolname);
    });
  }

  // updateComplete(file: any, group: any) {
  //   const { fileid, filename } = file;
  //   group.fileid = fileid;
  //   group.filename = filename;
  //   this.uploadComplete.emit(group.fileid);
  // }

  onUploadComplete(evt: any , field : any) {
    
    const { fileid, filename } = evt;
    const mapFile = {
      filename : filename as string,
      fileid : fileid as string
    } as any
    // console.log('evt = ', mapFile);
    switch(field){
      case "resultcomitteefile" : {this.form.controls.resultcomitteefile.patchValue(mapFile)}
      break;
      case "resulttoaccuserfile" : {this.form.controls.resulttoaccuserfile.patchValue(mapFile)}
      break;
      case "resulttoschoolfile" : {this.form.controls.resulttoschoolfile.patchValue(mapFile)}
      break;
      case "resulttoaccusedfile" : {this.form.controls.resulttoaccusedfile.patchValue(mapFile)}
      break;
    }
    // this.form.controls.resultcomitteefile.patchValue(mapFile)

  }

  // uploadComplete(evt: any) {
  //   //console.log('upload result = ', evt);
  //   const fileInfo: any = evt;
  //   this.form.patchValue(fileInfo);
  //   //console.log('this.form.value = ', this.form.value);
  // }

  

}
