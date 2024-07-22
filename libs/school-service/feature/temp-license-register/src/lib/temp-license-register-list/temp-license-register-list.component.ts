import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  careerTypeList,
  SchoolLangMapping,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import {
  KspRequest,
  SchRequestSearchFilter,
  SchTempLicense,
} from '@ksp/shared/interface';
import {
  LoaderService,
  SchoolInfoService,
  SchoolRequestService,
} from '@ksp/shared/service';
import {
  changeToEnglishMonth,
  changeToThaiNumber,
  getCookie,
  schoolMapRequestType,
  thaiDate,
  zutils
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

import { ZNGViewerComponent } from '@ksp/shared/dialog';
import { PDFMAP_TEMPLIC } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-temp-license-register-list',
  templateUrl: './temp-license-register-list.component.html',
  styleUrls: ['./temp-license-register-list.component.scss'],
})
export class TempLicenseRegisterListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  SchoolRequestSubType = SchoolRequestSubType;
  checkRequestType = schoolMapRequestType;
  schoolId = getCookie('schoolId');
  defaultForm = {
    requesttype: '3',
  };
  initialSearch = true;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  careerTypeList = careerTypeList;
  searchNotFound = false;
  dataSource = new MatTableDataSource<KspRequest>();
  displayedColumns: string[] = displayedColumns;

  form = this.fb.group({
    licenseSearch: [this.defaultForm],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private requestService: SchoolRequestService,
    public dialog: MatDialog,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // ---------------------------------------------------------------------------------
  getTempLicense(request: KspRequest) {
    this.requestService.getKspRequest(request.id).subscribe((res) => {
      console.log('temp license = ', res);
      this.openApprovedPdf(this.mapResponse(res) as any);
    });
  }
  // ---------------------------------------------------------------------------------
  mapResponse(resp: any)
  {
     let licenddate = (resp.data.history[0].CREATE_DATE).split(/-/g)
         licenddate = `${licenddate[0]}-${licenddate[1]}-${ parseInt(licenddate[2]) + 2 }`

      const approvedetail = resp.data.history.find( ( hist : any ) => {
                                  //console.log( hist.DETAIL )
                                  return  !!hist.DETAIL && !!hist.DETAIL.checkdetail && !!hist.DETAIL.checkdetail.approveNo 
                            })
     return {
              licenseno_en : approvedetail.DETAIL.checkdetail.approveNo ,
                 licenseno : zutils.converttoTHNumber(approvedetail.DETAIL.checkdetail.approveNo) ,
                  prefixth : resp.data.kspreq.PREFIX_TH,
               firstnameth : resp.data.kspreq.FIRST_NAME_TH,
                lastnameth : resp.data.kspreq.LAST_NAME_TH,
                  prefixen : resp.data.kspreq.PREFIX_EN,
               firstnameen : resp.data.kspreq.FIRST_NAME_EN,
                lastnameen : resp.data.kspreq.LAST_NAME_EN,
                  position : resp.data.kspreq.CAREER_TYPE,
          licensestartdate : resp.data.history[0].CREATE_DATE,
            licenseenddate : licenddate,
               licensetype : resp.data.kspreq.CAREER_TYPE,
               approveDate: approvedetail.DETAIL.checkdetail.approveDate
     }
  }

// --------------------------------------------------------------------------------------
  openApprovedPdf(element: any) {
    //console.log('element = ', element);
    // -------------------------------
    const approveDetail = {
      approveDate: element.approveDate,
      approveNo: element.licenseno_en
    }
    const payload = {
      schoolid: this.schoolId,
    };
    // -------------------------------
    this.schoolInfoService.getSchoolInfo(payload).subscribe((res: any) => {
      const collect           = collectTempLicData(element, approveDetail , res.schoolname , res.bureauname )
      
      this.dialog.open(ZNGViewerComponent, {
        width: '1200px',
        height: '90vh',
        data: {
          pdfSrcUrl: 'assets/pdf/school-temp-approve-license.pdf',
          pdfMapper: PDFMAP_TEMPLIC,
          input: { 
            approve_no: collect.prefix,
            fullname_th: collect.name,
            fullname_en: collect.nameen,
            position_th_1: collect.careertype,
            position_en_1: collect.careertypeen,
            startdate_th: collect.startth,
            startdate_en: collect.starten,
            enddate_th: collect.endth,
            enddate_en: collect.enden,
            orgname_th: collect.schoolname,
            orgname_en: '',
            approver_th: collect.schoolapprovename,
            approver_en: collect.schoolapprovenameen,
            position_th_2: collect.careertype,
            position_en_2: collect.careertypeen,
            senddate_th: collect.fulldateth,
            senddate_en: collect.fulldateen
          }
        },
      });
    })
    

  }

  // --------------------------------------------------------------------------------------
  clear() {
    this.form.reset();
    this.searchNotFound = false;
    this.dataSource.data = [];
    this.form.controls.licenseSearch.patchValue(this.defaultForm);
  }

  search(f: Partial<SchRequestSearchFilter>) {
    //console.log('filters = ', filters);
    const payload: SchRequestSearchFilter = {
      schoolid: `${this.schoolId}`,
      requesttype: '3',
      requestno: f.requestno,
      careertype: f.careertype,
      name: f.name,
      idcardno: f.idcardno,
      passportno: f.passportno,
      process: '5',
      status: '2',
      requestdatefrom: f.requestdatefrom,
      requestdateto: f.requestdateto,
      offset: '0',
      row: '500',
    };

    const resp = this.requestService.schSearchRequest(payload)
    resp?.subscribe((res) => {
      // search without showing result do automatically after load
      if (res && res.length) {
        const data = res.map((i) => {

          const license = JSON.parse(i.detail || '{}');
          console.log( i )
          return {
            ...i,
            ...{
              licenseDate: license?.checkdetail?.approveDate,   // Get approveDate from checkdetail
            },
          };
        });
        this.searchNotFound = false;
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }
    });
  }
}

export const displayedColumns = [
  'order',
  'idcardno',
  'name',
  'requesttype',
  'careertype',
  'requestdate',
  'licensepdf',
];

// --------------------------------------------------------------------
function getPrefix(data : any, lang : string = 'th')
{
  const notfound : any[any] = {
                                  th : 'ไม่ระบุ',
                                  en : 'Not Indentified'
                              }
  const prefix : any[any]   = {
                      en : {
                        '1' : 'MR.',
                        '2' : 'MRS.',
                        '3' : 'MISS.',
                        '4' : 'MS.',
                        '5' : 'LADY',
                        '6' : 'M.L.',
                        '7' : 'M.R.',
                        '8' : 'M.C.'
                      },
                      th : {
                        '1' : 'นาย',
                        '2' : 'นาง',
                        '3' : 'นางสาว',
                        '4' : 'นางหรือนางสาว',
                        '5' : 'ท่านผู้หญิง',
                        '6' : 'หม่อมหลวง',
                        '7' : 'หม่อมราชวงศ์',
                        '8' : 'หม่อมเจ้า'
                      }
                   }

  let   result    : any     = prefix[lang][data]

  if( prefix[lang][data] === undefined )
  {
    result = notfound[lang]
  }
          
  return result
}
// --------------------------------------------------------------------
function collectTempLicData(data : any, approveDetail: any , schoolname : string, bureauname : string)
{
    const position      = data?.position;
    const licstartdate  = data.requestdate || data.licensestartdate
    const approveDate   = approveDetail.approveDate
    const startDate     = new Date(licstartdate || '')
    const endDate       = new Date(licstartdate || '');
          endDate.setFullYear(startDate.getFullYear() + 2)
    const date          = new Date(approveDate || '');
    const thai          = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const fulldateth = `${changeToThaiNumber( day )} ${month} พ.ศ. ${changeToThaiNumber(year)}`;
    const fulldateen = `${day} ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;

    const prefixen     = getPrefix(data.prefixen, 'en')
    const prefixth     = getPrefix(data.prefixth, 'th')

    const nameen       = prefixen + ' ' + data.firstnameen + ' ' + data.lastnameen
    const name         = prefixth + ' ' + data.firstnameth + ' ' + data.lastnameth

    const start = thaiDate(startDate);
    const end = thaiDate(endDate);
    const startth = changeToThaiNumber(start);
    const endth = changeToThaiNumber(end);
    const starten = changeToEnglishMonth(start);
    const enden = changeToEnglishMonth(end);
    const careertype = SchoolRequestSubType[+(data?.licensetype ?? '1')];
    const careertypeen = SchoolLangMapping[careertype ?? 'ครู'] ?? '';
    const requestno = data.licenseno ?? '';
    // const prefix = `${data.careertype !== '5' ? 'ท.' : 'อ.'}${ zutils.converttoTHNumber(approveDetail.approveNo) }` ;
    const prefix = `${data.careertype !== '5' ? 'ท.' : 'อ.'}${ approveDetail.approveNo }` ;

  return {
            prefix: prefix,
            position: position,
            requestno: requestno,
            careertype :     careertype,
            careertypeen :  careertypeen,
            name :          name,
            nameen :        nameen,
            startth :       startth,
            endth :         endth,
            starten :       starten,
            enden :         enden,
            day :           day,
            month :         month,
            year :          year,
            fulldateth :    fulldateth,
            fulldateen :    fulldateen,
            schoolname: schoolname,
            bureauname: bureauname,
            schoolapprovename: 'ผู้อํานวยการสถานศึกษา',
            schoolapprovenameen: 'Director of the Educational Institution'
  }
}