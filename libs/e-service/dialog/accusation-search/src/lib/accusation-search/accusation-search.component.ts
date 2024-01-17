import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';

import { replaceEmptyWithNull, zutils , zdtform } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import {
  SelfServiceRequestSubTypeSTR,
} from '@ksp/shared/constant';
import { SelfLicense } from '@ksp/shared/interface';

@Component({
  selector: 'e-service-ethic-ui-accusation-list',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
})
export class AccusationSearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    id:'',
    licenseno:'',
    certificateno:'',
    idcardno: '',
    prefixth: '',
    firstnameth: '',
    lastnameth: '',
    bureauid: '',
    schoolname: '',
    province: '',
    usertype:'',
    certificatestartdate:'',
    certificateenddate:'',
    offset: '0',
    row: '20',
  });
  SelfServiceRequestSubTypeSTR = SelfServiceRequestSubTypeSTR;
  selectedRow: any;
  personSelected = false;
  addressSelected = false;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  dataSource2: any;
  personalInfo : any;
  addressInfo : any;
  identityNo: any;
  licenseId: any;
  licenseInfo: SelfLicense| null | any = null;
  selectLicTab = '';
  currentPage = 1;
  prefixList$!: Observable<any>;
  bureaus$!: Observable<any>;
  provinces$!: Observable<any>;
  selectedIdCard!: any;
  constructor(
    private fb: FormBuilder,
    private service: EthicsService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefixJSON();
    this.bureaus$ = this.generalInfoService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  search() {
    this.currentPage = 1;
    this.searchPage(this.currentPage);
  }

  clear() {
    this.dataSource.data = [];
  }
  goPrevious() {
    if (this.currentPage == 1) return;
    this.currentPage -= 1;
    this.searchPage(this.currentPage);
  }
  searchPage(page: number) {
    const formValue = this.form.value;
    const payload = replaceEmptyWithNull(formValue);
    payload.offset = String((page - 1) * 20);
    this.service.searchSelfMyInfo(payload).subscribe((res) => {
      this.dataSource.data = res;
    });

  }
  goNext() {
    this.currentPage += 1;
    this.searchPage(this.currentPage);
  }
  onClickRadio(form: any) {
    // this.selectedIdCard = form.identitynumber;
    const payload2 = { "id" : form.id }
    this.service.searchSelfLicense(payload2).subscribe((res) => {

      this.licenseInfo = selectLicense(res)

      form.licenseno  = res[0].licenseno as string;
      form.usertype   = res[0].usertype as string;
      form.careertype       = SelfServiceRequestSubTypeSTR[res[0].usertype]
      form.certificatestartdate   = cleanUpDate(res[0].certificatestartdate) as string;
      form.certificateenddate   = cleanUpDate(res[0].certificateenddate) as string;
    });
    this.selectedIdCard = form;
  }
  onClickGetInfo(form: any) {
      this.onClickRadio( form )

      this.personalInfo  = form as any
      this.identityNo = form.identitynumber
      this.personSelected = true;
  }

  onClickTabLicenseType(data : any){
    this.selectLicTab = data
  }
}

// ----------------------------------------------------
function selectLicense(dataarray : any[any])
{
  const result : SelfLicense  = {}
  const now                   = new Date()

  dataarray.map( (license : any) => {
    const cert_end = zutils.exist(license.certificateenddate) ? new Date( license.certificateenddate ) : undefined
    if( cert_end !== undefined && (cert_end >= now) )
    {
      result.userid           = license.userid
      result.idcardno         = license.identitynumber
      result.certificateno    = license.certificateno
      result.careertype       = SelfServiceRequestSubTypeSTR[license.usertype]
      result.licensetype      = license.usertype
      result.licenseno        = license.certificateno
      result.certificatestartdate = cleanUpDate(license.certificatestartdate)
      result.certificateenddate   = cleanUpDate(license.certificateenddate)
      result.firstnameth      = license.nameth
      result.lastnameth       = license.lastnameth
      result.firstnameen      = license.nameen
      result.lastnameen       = license.lastnameen
      result.passportno       = license.passportno
      result.sex              = license.genderid
    }
  })

  return result 
}

// ----------------------------------------------------

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

export const column = [
  'order',
  'select',
  'view',
  'personId',
  'name',
  'organization',
  'school',
  'province',
];
