import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';
import { PersonInfoComponent , AddressInfoComponent } from '@ksp/e-service/ui/accusation-info';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent, StepperNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseInfoCardComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ACCUSATION_FILES,
  defaultEhicsMember,
  defaultCondemnation,
  defaultAccused,
  defaultAccusationaction,
  EhicsMember,
  EhicsCondemnation,
  Ehicsaccused,
  EhicsAccusationaction,
  KspFormBaseComponent,
  decisionsSelector,
  accusationtypeList
} from '@ksp/shared/interface';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { GeneralInfoService } from '@ksp/shared/service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'e-service-ethic-accusation-record',
  templateUrl: './accusation-record.component.html',
  styleUrls: ['./accusation-record.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    TopNavComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    LicenseInfoCardComponent,
    ReactiveFormsModule,
    StepperNavComponent,
    MatDatepickerModule,
  ],
  providers: providerFactory(AccusationRecordComponent),
})
export class AccusationRecordComponent
  extends KspFormBaseComponent
  implements OnInit
{
  decisions = decisionsSelector;
  accusationtypeList = accusationtypeList;
  today = thaiDate(new Date());
  requestNumber = '';
  accusationFiles: any[] = structuredClone(ACCUSATION_FILES);
  uniqueTimestamp: any;
  updateStatus = false;
  accusertype: any;
  selectId: any;
  addressId: any;
  accusedInfo: any;
  prefixList$!: Observable<any>;
  sellictypetab: any;
  isActionBox= false;

  override form = this.fb.group({
    accusationblackno: [null, Validators.required],
    accusationtype: [null, Validators.required],
    accusationincidentdate: [null, Validators.required],
    accusationincidentplace: [null, Validators.required],
    accusationcondemnationtype: 0,
    accusationaction: this.fb.group({
                                      self: [],
                                      profession: [],
                                      service: [],
                                      coworkers: [],
                                      society: [],
                                    }),
    accusationcondemnation: this.fb.array([] as FormGroup[]), //[null, Validators.required],
    accusationissuedate: [],
    accusationdetail: [],
    accusationpunishmentdetail: [],
    accusationviolatedetail: [],
    accusationassignofficer: [],
    accusationassigndate: [],
    accuserinfo: this.fb.array([] as FormGroup[]),
    licenseinfo: this.fb.array([] as FormGroup[]),
    accusationconsideration: this.fb.group({
      decisions: [''],
      otherDetail: [''],
    }),
    id : []
  });

  @ViewChild(PersonInfoComponent)
  personinfo!: PersonInfoComponent;
  @ViewChild(AddressInfoComponent)
  addressinfo!: AddressInfoComponent;

  currentlictab : any = ''

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
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
  get members() {
    return this.form.controls.accuserinfo as FormArray;
  }

  get accuseds() {
    return this.form.controls.licenseinfo as FormArray;
  }

  get accusationcondemnations() {
    return this.form.controls.accusationcondemnation as FormArray;
  }

  // get accusationactions() {
  //   return this.form.controls.accusationaction as FormArray;
  // }

  addRow(data: EhicsMember = defaultEhicsMember) {
    const rewardForm = this.fb.group({
      idcardno: [data.idcardno],
      accusertype:[data.accusertype],
      groupname:[data.groupname],
      address:[data.address],
      prefix: [data.prefix],
      fullname: [data.fullname],
      phone: [data.phone],
    });
    this.members.push(rewardForm);
  }
  deleteRow(index: number) {
    this.members.removeAt(index);
  }

  addAccusedRow(accusedData: Ehicsaccused = defaultAccused){//(data: EhicsSubcommittee = defaultSubcommittee) {
    // this.accusedInfo = accusedData
    console.log(accusedData)
    console.log(accusedData.licenseno)
    const accusedForm = this.fb.group({
      id: [accusedData.id],
      licenseno: [accusedData.licenseno],
      identitynumber: [accusedData.identitynumber],
      usertype: [accusedData.usertype],
      titlethid: [accusedData.titlethid],
      nameth: [accusedData.nameth],
      lastnameth: [accusedData.lastnameth],
      phonenumber: [accusedData.phonenumber],
      certificatestartdate: [accusedData.certificatestartdate],
      certificateenddate: [accusedData.certificateenddate],
      bureau: [accusedData.bureau]
    });
    console.log(accusedForm)
    this.accuseds.push(accusedForm);
  }
  deleteAccusedRow(index: number) {
    this.accuseds.removeAt(index);
  }

  addCondemnationRow(data: EhicsCondemnation = defaultCondemnation) {
    // this.accusedInfo = accusedData
    // console.log(accusedData)
    const accusationcondemnationForm = this.fb.group({
      condemnationtype : [data.condemnationtype],
      condemnationdetail : [data.condemnationdetail]
    });
    this.accusationcondemnations.push(accusationcondemnationForm);
  }
  deleteCondemnationRow(index: number) {
    this.accusationcondemnations.removeAt(index);
  }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log('res2 = ', res);
    });
    this.uniqueTimestamp = uuidv4();
    this.getListData();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(AccusationSearchComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("after Close ::: ",result);
      if(result !== ""){
      this.addAccusedRow(result)
      }
      this.selectId = result
      this.addressId = result
      this.updateStatus = true
    });
  }

  setAccusationaction(data: EhicsAccusationaction = defaultAccusationaction)
  {
    // console.log(data);
    let getdata = this.form.controls.accusationaction.value as any;
    

  }

  checkAction(name:any){
    let getdata = this.form.controls.accusationaction.value as any;
    if(getdata[name] == null){
      getdata[name] = true 
    }else if( !isNaN( getdata[name]) ){
      getdata[name] = false 
    }
    // console.log(getdata);
  }

  // ------------------------------------------------------
  setAccusedInfo(accused_data: any)
  {
    this.personinfo.assignPersonInfo( accused_data )
    this.addressinfo.queryAddressInfo( accused_data )
  }

  setAddressInfo(accused_data: any)
  {
    this.addressinfo.assignAddressInfo( accused_data )
  }

  getAddressInfo(accused_data: any)
  {
    this.addressinfo.queryAddressInfo( accused_data )
  }
  // ------------------------------------------------------
  onChangeIDcardno(event : any)
  {
    const regex = /[^0-9]/g
    const dom   = event.target
    dom.value = dom.value.replace(regex, '')
  }

  // ------------------------------------------------------
  onChangeLicTab(event : any)
  {
      this.currentlictab = event
  }

}


// export const decisionsSelector = [
//   {
//     label: 'รับเรื่องพิจารณา และดำเนินการขั้นต่อไป',
//     value: 1,
//   },
//   {
//     label: 'ไม่รับเรื่องพิจารณาและจำหน่ายออก เนื่องจากอายุความเกิน 1 ปี',
//     value: 2,
//   },
//   {
//     label: 'ยุติเรื่องกรณีไม่มีหนังสืออนุญาต',
//     value: 3,
//   },
//   {
//     label: 'บัตรสนเทห์',
//     value: 4,
//   },
//   {
//     label: 'หนังสือร้องเรียนขาดสาระสำคัญ',
//     value: 5,
//   },
//   {
//     label:
//       'เหตุเกิดก่อนข้อบังคับคุรุสภาว่าด้วยมาตรฐานวิชาชีพและจรรยาบรรณวิชาชีพ พ.ศ.2548',
//     value: 6,
//   },
//   {
//     label: 'อื่นๆ (ระบุด้วยตนเอง)',
//     value: 7,
//   },
// ];