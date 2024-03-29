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
import { providerFactory, thaiDate , zdtform } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { GeneralInfoService } from '@ksp/shared/service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { isArray, isNull } from 'lodash';
interface typeList {
  value: any;
  label: string;
  name?: string;
  selected: false;
}

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
  arrayType : typeList[] = []
  actionSelected : any;

  override form = this.fb.group({
    accusationblackno: [null, Validators.required],
    accusationtype: [null, Validators.required],
    accusationincidentdate: [null, Validators.required],
    accusationincidentplace: [null, Validators.required],
    accusationcondemnationtype: 0,
    // accusationaction: this.fb.group({
    //                                   self: [],
    //                                   profession: [],
    //                                   service: [],
    //                                   coworkers: [],
    //                                   society: [],
    //                                 }),
    accusationaction: [],
    accusationcondemnation: this.fb.array([] as FormGroup[]), //[null, Validators.required],
    accusationissuedate: [],
    accusationreceiveddate:[],
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
      this.form?.valueChanges.subscribe((values) => {

        if( isNull(values.accusationaction ) && this.arrayType.length == 0){
          for(let accusationType of accusationtypeList){
            let { label , value } = accusationType
            this.arrayType.push({
                            label:label,
                            value:value,
                            selected:false
                          })
          }
          
          values.accusationaction  = this.arrayType as any
          
        }else if(isNull(values.accusationaction ) && this.arrayType.length > 0){
          values.accusationaction  = this.arrayType as any
        }else if(isArray(values.accusationaction) === false){
          values.accusationaction  = this.arrayType as any
        }else{

          this.arrayType = values.accusationaction as any
          if(this.arrayType[0].hasOwnProperty('label') == false){
            this.arrayType = []
            for(let index=0 ; index < accusationtypeList.length ; index++ ){
              let { label , value } = accusationtypeList[index]
              this.actionSelected  = values.accusationaction 
              this.arrayType.push({
                              label:label,
                              value:value,
                              selected: this.actionSelected[index]
                            })

            }
            values.accusationaction  = this.arrayType as any
          }

        }

        this.onChange(values);
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
    if(this.mode === 'view'){
      this.members.disable()
    }
  }
  deleteRow(index: number) {
    this.members.removeAt(index);
  }

  addAccusedRow(accusedData: Ehicsaccused = defaultAccused){//(data: EhicsSubcommittee = defaultSubcommittee) { // accusedData: Ehicsaccused = defaultAccused
    this.accusedInfo = accusedData
    const accusedForm = this.fb.group({
      id: [accusedData.id],
      licenseno: [accusedData.licenseno],
      identitynumber: [accusedData.identitynumber],
      usertype: [accusedData.usertype],
      titlethid: [accusedData.titlethid],
      nameth: [accusedData.nameth],
      lastnameth: [accusedData.lastnameth],
      phonenumber: [accusedData.phonenumber],
      certificateno: [accusedData.certificateno],
      careertype:[accusedData.careertype],
      certificatestartdate: [zdtform.convertDateForm(accusedData.certificatestartdate, 'th', 'be', 'DD MMMM YYYY') ],
      certificateenddate: [ zdtform.convertDateForm(accusedData.certificateenddate, 'th', 'be', 'DD MMMM YYYY')],
      bureau: [accusedData.bureau]
    });
    this.accuseds.push(accusedForm);
    if(this.mode === 'view'){
      this.accuseds.disable()
    }
  }
  deleteAccusedRow(index: number) {
    this.accuseds.removeAt(index);
  }

  addCondemnationRow(data: EhicsCondemnation = defaultCondemnation) {
    // this.accusedInfo = accusedData
    const accusationcondemnationForm = this.fb.group({
      condemnationtype : [data.condemnationtype],
      condemnationdetail : [data.condemnationdetail]
    });

    this.accusationcondemnations.push(accusationcondemnationForm);
    if(this.mode === 'view'){
      this.accusationcondemnations.disable()
    }
  }
  deleteCondemnationRow(index: number) {
    this.accusationcondemnations.removeAt(index);
  }

  ngOnInit(): void {
    // this.route.data.subscribe((res) => {
    //   console.log('res2 = ', res);
    // });
    this.uniqueTimestamp = uuidv4();
    this.getListData();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefixJSON();
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
      // console.log("after Close ::: ",result);
      if(result !== ""){
      this.addAccusedRow(result)
      }
      this.selectId = result
      this.addressId = result
      this.updateStatus = true
    });
  }

  // setAccusationaction(data: EhicsAccusationaction = defaultAccusationaction)
  // {
  //   // console.log(data);
  //   let getdata = this.form.controls.accusationaction.value as any;
    

  // }


  onCheckedType(evt:any,actType:any){

    let getActIndex   =  accusationtypeList.findIndex((data)=>{
          return data.value == actType
    })

    this.arrayType[getActIndex].selected =   evt.target.checked
    this.form.controls.accusationaction.patchValue(this.arrayType as any)
  }

  // checkAction(name:any){
  //   let getdata = this.form.controls.accusationaction.value as any;
  //   if(getdata[name] == null){
  //     getdata[name] = true 
  //   }else if( !isNaN( getdata[name]) ){
  //     getdata[name] = false 
  //   }
  //   // console.log(getdata);
  // }

  // ------------------------------------------------------
  setAccusedInfo(accused_data: any)
  {
    this.personinfo?.assignPersonInfo( accused_data )
    this.addressinfo?.queryAddressInfo( accused_data )
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

function cleanUpDate(data: string)
{
  let convertSTRpass      = true
  let convertFormSTRpass  = true
  let convertSTR : any
  let convertFormSTR : any

  try{
      convertSTR          = zdtform.from(data , 'UTC_MS',0)
      const result        =  new Date( convertSTR ) 
      convertSTRpass      = isFinite(result.getTime())
  }catch(excp){
      convertSTRpass      = false
  }
  try{
      convertFormSTR      = zdtform.convertDateStrtoDTStr(data , 'DD-MMM-YY')
      const result        = new Date( convertFormSTR ) 
      convertFormSTRpass  = isFinite(result.getTime())
  }catch(excp){
      convertFormSTRpass  = false
  }

  if( convertSTRpass ) 
      return convertSTR
  else if( convertFormSTRpass ) 
      return convertFormSTR
  else 
      return ""
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