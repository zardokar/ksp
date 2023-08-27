import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  decisions,
  defaultSubcommittee,
  defaultAccusationaction,
  EhicsSubcommittee,
  EhicsAccusationaction,
  KspFormBaseComponent,
  allegationList,
  accusationtypeList
} from '@ksp/shared/interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { GeneralInfoService } from '@ksp/shared/service';

@Component({
  selector: 'e-service-form-investigation-allegation',
  templateUrl: './form-investigation-allegation.component.html',
  styleUrls: ['./form-investigation-allegation.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: providerFactory(FormInvestigationAllegationComponent),
})
export class FormInvestigationAllegationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  decisions = decisions;
  selecteddecisions : any;
  disabled = false;
  allegationList = allegationList;
  accusationtypeList  = accusationtypeList;
  actionShow  = [] as string[];

  override form = this.fb.group({
    accusationcondemnation:[],
    accusationaction:[],

    investigationorderno: [],
    investigationorderdate: [],
    investigationsubcommittee: this.fb.array([] as FormGroup[]),
    investigationdate: [],
    investigationreportdate: [],
    investigationreport: [],
    investigationfile: [],
    investigationaction: this.fb.group({
                                        self: [],
                                        profession: [],
                                        service: [],
                                        coworkers: [],
                                        society: [],
                                      }),
    investigationnotificationdate:[],
    investigationaccusedrecognizedate:[],
    investigationdetail:[],
    investigationevidencefile:[],
    investigationresult: this.fb.group({
      informaccused:[],
      confirminformaccused:[],
      rejectinformaccused:[],
      decisions: [],
      causedetail: [],
      evidence:[],
    }),
  });

  ngOnInit(): void {
    this.getListData();
  }

  constructor(
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
  // get members() {
  //   return this.form.controls.investigationsubcommittee as FormArray;
  // }
  // addRow(data: EhicsSubcommittee = defaultSubcommittee) {
  //   const rewardForm = this.fb.group({
  //     idcardno: data.idcardno,
  //     idnumber: data.idnumber,
  //     positioncommittee: data.positioncommittee,
  //     prefix: data.prefix,
  //     firstname: data.firstname,
  //     lastname: data.lastname,
  //     position: data.position,
  //     bureau: data.bureau,
  //   });
  //   this.members.push(rewardForm);
  // }
  // deleteRow(index: number) {
  //   this.members.removeAt(index);
  // }
  setAccusationAction(data:any){
    let getkeys = Object.keys(data)
    for(let name of getkeys){
      let checkstatus = data[name]
      if(checkstatus == true){
        let getListLabel  = accusationtypeList.find((action)=>{return action.name == name})
        let getLabel  = getListLabel?.label as string
        this.actionShow.push(getLabel)
      }
    }
  }


  getListData() {
    
    this.prefixList$ = this.generalInfoService.getPrefix();
    console.log(this.prefixList$)
  }
}
