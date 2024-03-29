import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
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
import { isNull , isArray, forEach } from 'lodash';
interface checkboxData {
  value: any;
  label: string;
  name?: string;
  selected: false;
}

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
  // @Input() hideAllButtons = false;
  // @Input() hideContainer = false;
  // @Input() hideTitle = false;
  // @Output() arrayAct : checkboxData[] = []
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  decisions = decisions;
  selecteddecisions : any;
  // disabled = false;
  allegationList = allegationList;
  accusationtypeList  = accusationtypeList;
  actionShow  = [] as string[];
  arrayAct : checkboxData[] = []
  arrayActed = false

  override form = this.fb.group({
    accusationcondemnation:[],
    // accusationaction:[],
    investigationnote:[],
    investigationorderno: [],
    investigationorderdate: [],
    investigationsubcommittee: this.fb.array([] as checkboxData[]),
    investigationdate: [],
    investigationreportdate: [],
    investigationreport: [],
    investigationfile: [],
    // investigationaction: this.fb.group({
    //                                     self: [],
    //                                     profession: [],
    //                                     service: [],
    //                                     coworkers: [],
    //                                     society: [],
    //                                   }),
    // investigationaction: this.fb.array([] as checkboxData[]),
    investigationaction: [],
    investigationnotificationdate:[],
    investigationnotificationdetail:[],
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
    // this.getListData();
  }

  ngAfterViewInit(): void {
    // this.arrayAct = []
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
      
      this.form?.valueChanges.subscribe((values) => {

        // this.arrayAct = []
        if(this.arrayActed == false){
          if( isNull(values.investigationaction ) ||  values?.investigationaction == undefined ){
            // this.arrayAct = []
            for(let allegationType of allegationList){
              let { label , value } = allegationType
              this.arrayAct.push({
                              label:label,
                              value:value,
                              selected:false
                            })
            }
            this.arrayActed  = true
            values.investigationaction  = this.arrayAct as any
          }
          else {
            this.arrayAct = values.investigationaction
          }

        }else{
          this.arrayAct = values?.investigationaction ? values?.investigationaction : this.arrayAct
        }

        this.onChange(values);
        this.onTouched();

      })
    );
  }

  setAccusationAction(data:any){
    this.actionShow = []
    for(let AccAct of data){
      if(AccAct.selected == true){
        // let getListLabel  = accusationtypeList.find((action)=>{return action.value == this.value})
        let getLabel  = AccAct?.label as string
        this.actionShow.push(getLabel)
      }
    }
  }


  getListData() {

    this.prefixList$ = this.generalInfoService.getPrefix();
    // console.log(this.prefixList$)
  }

  onCheckedAction(evt:any,actType:any){

    let getActIndex   =  allegationList.findIndex((data)=>{
          return data.value == actType
      })

    this.arrayAct[getActIndex].selected =   evt.target.checked
    this.form.controls.investigationaction.patchValue(this.arrayAct as any)

    // this.form.controls.investigationaction.disable()

  }

}
