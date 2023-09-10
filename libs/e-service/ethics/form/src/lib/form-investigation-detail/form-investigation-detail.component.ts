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
  EhicsSubcommittee,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { GeneralInfoService } from '@ksp/shared/service';
import { v4 as uuidv4 } from 'uuid';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'e-service-form-investigation-detail',
  templateUrl: './form-investigation-detail.component.html',
  styleUrls: ['./form-investigation-detail.component.scss'],
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
  providers: providerFactory(FormInvestigationDetailComponent),
})
export class FormInvestigationDetailComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() searchType = '';
  @Input() bureaus: any[] = [];
  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  decisions = decisions;
  selecteddecisions : any;
  disabled = false;
  uniqueTimestamp: any;

  override form = this.fb.group({
    investigationnotificationdetail:[],
    investigationrecognizedate:[],
    investigationexplaindate:[],

    investigationorderno: [],
    investigationorderdate: [],
    investigationsubcommittee: this.fb.array([] as FormGroup[]),
    investigationdate: [],
    investigationreportdate: [],
    investigationreport: [],
    investigationfile: [],
    investigationresult: this.fb.group({
      informaccused:[],
      confirminformaccused:[],
      rejectinformaccused:[],
      decisions: [],
      causedetail: [],
    }),
  });

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.getListData();
  }

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
  get members() {
    return this.form.controls.investigationsubcommittee as FormArray;
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
  }
  deleteRow(index: number) {
    this.members.removeAt(index);
  }
  getListData() {
    
    this.prefixList$ = this.generalInfoService.getPrefix();
    console.log(this.prefixList$)
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
}
