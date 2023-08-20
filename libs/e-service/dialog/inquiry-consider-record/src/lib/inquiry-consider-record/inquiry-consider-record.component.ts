import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';

import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'e-service-ethic-ui-inquiry-consider-record',
  templateUrl: './inquiry-consider-record.component.html',
  styleUrls: ['./inquiry-consider-record.component.scss'],
})
export class InquiryConsiderRecordComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  form = this.fb.group({
    meetingtimes: '',
    meetingdate: '',
    meetingreason: '',
    meetingfile: []
  });
  selectedRow: any;
  personSelected = false;
  addressSelected = false;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  uniqueTimestamp: any;
  dataSource2: any;
  personalInfo : any;
  addressInfo : any;
  identityNo: any;
  licenseId: any;
  currentPage = 1;
  prefixList$!: Observable<any>;
  bureaus$!: Observable<any>;
  provinces$!: Observable<any>;
  submitConsider: any;
  constructor(
    private fb: FormBuilder,
    private service: EthicsService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    public dialog: MatDialog,
    
    
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureaus$ = this.generalInfoService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
    this.uniqueTimestamp = uuidv4();
  }
  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  // }
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
  // onClickRadio(form: any) {
  //   // this.selectedIdCard = form.identitynumber;
  //   const payload2 = { "id" : form.id }
  //   this.service.searchSelfLicense(payload2).subscribe((res) => {
  //     console.log(res);
  //     form.licenseno  = res[0].licenseno as string;
  //     form.usertype   = res[0].usertype as string;
  //     form.certificatestartdate   = res[0].certificatestartdate as string;
  //     form.certificateenddate   = res[0].certificateenddate as string;
  //   });
  //   this.selectedIdCard = form;
  // }
  onClickGetInfo(form: any) {
    // this.service
      // .searchSelfMyInfo({ identitynumber: form.identitynumber , licenseno: form.licenseno })
      // .subscribe((res) => {
      //   console.log(res)
      //   // if(this.personinfo){
        
      //   // }
      //   this.personalInfo  = res as any

      //   this.identityNo = form.id
      //   this.personSelected = true;
      //   // this.personinfo.assignPersonInfo( this.personalInfo )
      // });

      
      console.log(form);
      this.personalInfo  = form as any
      this.identityNo = form.identitynumber
      this.personSelected = true;

  }
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
