import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { FormInvestigationDetailComponent , FormInvestigationAllegationComponent } from '@ksp/e-service/ethics/form';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import {
  jsonParse,
  jsonStringify,
  replaceEmptyWithNull,
  mapMultiFileInfo,
  zdtform,
  mapFileInfo
} from '@ksp/shared/utility';
import { EMPTY, switchMap, zip } from 'rxjs';
import { InquiryDetailComponent} from '../inquiry-detail/inquiry-detail.component';
import { InquiryResultComponent } from '../inquiry-result/inquiry-result.component';
import _, { isArray } from 'lodash';
import { ACCUSATION_FILES} from '@ksp/shared/interface';
@Component({
  selector: 'e-service-inquiry-main',
  templateUrl: './inquiry-main.component.html',
  styleUrls: ['./inquiry-main.component.scss'],
})
export class InquiryMainComponent implements OnInit {
  form = this.fb.group({
    inquiry: [],
    inquiryResult: [],
    accusation: [],
    investigation: [],
    allegation:[],
  });
  ethicsId: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService,
    private route: ActivatedRoute
  ) {}
  @ViewChild(AccusationRecordComponent)
  accusation!: AccusationRecordComponent;
  @ViewChild(FormInvestigationDetailComponent)
  investigation!: FormInvestigationDetailComponent;
  @ViewChild(InquiryDetailComponent)
  inquiry!: InquiryDetailComponent;
  @ViewChild(InquiryResultComponent)
  inquiryResult!: InquiryResultComponent;
  @ViewChild(FormInvestigationAllegationComponent)
  allegation!: FormInvestigationAllegationComponent;
  cancel() {
    this.router.navigate(['/inquiry']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const payload = this.form.value.inquiry as any;
            if (payload) {
              payload.processid = '3'
              payload.id = this.ethicsId;
              payload.inquerylicensestatus                      = payload.inquerylicensestatus;
              payload.inquerylicensestatusnotificationdate      = cleanUpDate( payload.inquerylicensestatusnotificationdate );
              payload.inquerylicensestatusaccusedrecognizedate  = cleanUpDate(payload.inquerylicensestatusaccusedrecognizedate);
              payload.inquiryorderno                            = payload.inquiryorderno;
              payload.inquiryorderdate                          = cleanUpDate(payload.inquiryorderdate);
              payload.inquiryexplaindate                        = cleanUpDate(payload.inquiryexplaindate);
              payload.inquiryjbdate                             = cleanUpDate(payload.inquiryjbdate);
              payload.inquiryreport                             = payload.inquiryreport;
              payload.inquiryfile                               = JSON.stringify(payload.inquiryfile);
              payload.inquerymeetinghistory                     = JSON.stringify(payload.inquerymeetinghistory);
              payload.inquerylicensesuspendnotificationdate     = cleanUpDate(payload.inquerylicensesuspendnotificationdate);
              payload.inquerylicensesuspendrecognizedate        = cleanUpDate(payload.inquerylicensesuspendrecognizedate);
              payload.inquerynotificationdate                   = cleanUpDate(payload.inquerynotificationdate);
              payload.inquiryresult                             = JSON.stringify(payload.inquiryresult);
              payload.inquirysubcommittee                       = JSON.stringify( payload.inquirysubcommittee );
              payload.inqueryexaminereport                      = payload.inqueryexaminereport 
            }
            const payload2                = this.form.value.inquiryResult as any;
            if (payload2) {
              payload2.id                 = this.ethicsId;

              payload.resultredno         = payload2.resultredno
              payload.resultblackno       = payload2.resultblackno
              payload.resultcomitteeno    = payload2.resultcomitteeno
              payload.resultcomitteedate  = cleanUpDate( payload2.resultcomitteedate )
              payload.resultcomitteefile  = JSON.stringify(payload2.resultcomitteefile)
              payload.resulttoaccuserdate = cleanUpDate( payload2.resulttoaccuserdate )
              payload.resulttoaccuserfile = JSON.stringify(payload2.resulttoaccuserfile) 
              payload.resulttoschooldate  = cleanUpDate( payload2.resulttoschooldate )
              payload.resulttoschoolfile  = JSON.stringify(payload2.resulttoschoolfile)
              payload.resulttoaccuseddate = cleanUpDate( payload2.resulttoaccuseddate )
              payload.resulttoaccusedfile = JSON.stringify(payload2.resulttoaccusedfile)
              payload.resultdetail        = payload2.resultdetail 
              payload.resultstartsuspendlicensedate   = cleanUpDate( payload2.resultstartsuspendlicensedate ) 
              payload.resultendsuspendlicensedate     = cleanUpDate( payload2.resultendsuspendlicensedate )
              payload.resulttoaccusednotificationdate =  cleanUpDate( payload2.resulttoaccusednotificationdate )
              payload.resultacademicname              = payload2.resultacademicname 
              payload.resultaffiliationname           = payload2.resultaffiliationname 
              payload.resulttoschoolnotificationdate  =  cleanUpDate( payload2.resulttoschoolnotificationdate )
            }
            this.collectFormData(payload)
            
            const payload3= this.form.value.accusation as any;

            payload.accusationcondemnation        = JSON.stringify(payload3.accusationcondemnation)
            payload.accusationconsideration       = JSON.stringify(payload3.accusationconsideration)
            payload.accusationaction              = JSON.stringify(payload3.accusationaction)

            payload.accusationfile                = JSON.stringify(payload3.accusationfile)
            payload.accuserinfo                   = JSON.stringify(payload3.accuserinfo)
            payload.licenseinfo                   = JSON.stringify(payload3.licenseinfo)

            const allegationValue = this.form.value.allegation as any
            payload.investigationnotificationdate = allegationValue.investigationnotificationdate || null

            payload.investigationaccusedrecognizedate = allegationValue.investigationaccusedrecognizedate

            // payload.investigationnotificationdetail = JSON.stringify(
            //   allegationValue.investigationnotificationdetail
            // );
            payload.investigationnotificationdetail = allegationValue.investigationnotificationdetail
            payload.investigationnote = allegationValue.investigationnote
            // payload.investigationaction = allegationValue.investigationaction || null
            payload.investigationaction = JSON.stringify(allegationValue.investigationaction);
            // console.log(payload.investigationaction);

            payload.investigationdetail = allegationValue.investigationdetail

            return zip(
              // this.service.updateEthicsInquiry(replaceEmptyWithNull(payload)),
              // this.service.updateEthicsResult(replaceEmptyWithNull(payload2))
              this.service.updateEthicsAccusation( replaceEmptyWithNull(payload) )
            );
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
        }
      });
  }

  collectFormData(payload : any)
  {
    const investigation               = { ...(this.form.controls.investigation.value as any) }
    
    // payload.investigationfile         = investigation.investigationfile
    payload.investigationdate         = cleanUpDate( investigation.investigationdate )
    payload.investigationorderdate    = cleanUpDate( investigation.investigationorderdate )
    payload.investigationorderno      = investigation.investigationorderno
    payload.investigationreport       = investigation.investigationreport
    payload.investigationreportdate   = cleanUpDate(investigation.investigationreportdate ) 
    payload.investigationresult       = JSON.stringify(investigation.investigationresult)
    payload.investigationsubcommittee = JSON.stringify(investigation.investigationsubcommittee)

    // payload.accusationfile            = JSON.stringify(payload.accusationfile)
    // payload.accuserinfo               = JSON.stringify(payload.accuserinfo)
    // payload.licenseinfo               = JSON.stringify(payload.licenseinfo)

    return payload
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
  ngOnInit(): void {
    // this.checkRequestId();
  }

  ngAfterViewInit( ) : void{
    this.checkRequestId();
  }

  // ------------------------------------------------------------------------
  checkRequestId() {

    this.route.paramMap.subscribe( (params) => {
      this.ethicsId = Number(params.get('id'));

      if (this.ethicsId) {
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res: any) => {
            // ----------------------------------------------- Cleaning Data
            res.createdate                = cleanUpDate( res?.createdate )
            // res.licenseinfo               = jsonParse(res.licenseinfo)
            res.accusationassigndate      = res?.accusationassigndate ? cleanUpDate( res?.accusationassigndate ) : res.accusationassigndate
            res.accusationincidentdate    = res?.accusationincidentdate ? cleanUpDate( res?.accusationincidentdate ) : res.accusationincidentdate
            res.accusationissuedate       = res?.accusationissuedate ? cleanUpDate( res?.accusationissuedate ) : res.accusationissuedate
            res.inquiryjbdate             = res?.inquiryjbdate ? cleanUpDate( res?.inquiryjbdate ) : res.inquiryjbdate
            res.inquiryorderdate          = res?.inquiryorderdate ? cleanUpDate( res?.inquiryorderdate ) : res?.inquiryorderdate
            res.investigationdate         = res?.investigationdate ? cleanUpDate( res?.investigationdate ) : res.investigationdate
            res.investigationreportdate   = res?.investigationreportdate ? cleanUpDate( res?.investigationreportdate ) : res.investigationreportdate
            res.investigationorderdate    = res?.investigationorderdate ? cleanUpDate( res?.investigationorderdate ) : res.investigationorderdate
            res.inquerylicensestatus                      = res.inquerylicensestatus;
            res.inquerylicensestatusnotificationdate      = res?.inquerylicensestatusnotificationdate ? cleanUpDate(res.inquerylicensestatusnotificationdate) : res?.inquerylicensestatusnotificationdate;
            res.inquerylicensestatusaccusedrecognizedate  = res?.inquerylicensestatusaccusedrecognizedate ? cleanUpDate(res.inquerylicensestatusaccusedrecognizedate) : res?.inquerylicensestatusaccusedrecognizedate;
            res.inquiryorderno                            = res.inquiryorderno;
            res.inquiryexplaindate                        = res?.inquiryexplaindate ? cleanUpDate(res.inquiryexplaindate) : res?.inquiryexplaindate;
            res.inquiryreport                             = res.inquiryreport;
            res.inquiryfile                               = jsonParse(res.inquiryfile);
            res.inquerylicensesuspendnotificationdate     = res?.inquerylicensesuspendnotificationdate ? cleanUpDate(res.inquerylicensesuspendnotificationdate) : res?.inquerylicensesuspendnotificationdate;
            res.inquerylicensesuspendrecognizedate        = res?.inquerylicensesuspendrecognizedate ? cleanUpDate(res.inquerylicensesuspendrecognizedate ) : res?.inquerylicensesuspendrecognizedate;
            res.inquerynotificationdate                   = res?.inquerynotificationdate ? cleanUpDate(res.inquerynotificationdate) : res?.inquerynotificationdate;

            res.investigationaction = jsonParse(res.investigationaction)
            
            res.resultredno               = res.resultredno
            res.resultblackno             = res.resultblackno
            res.resultcomitteeno          = res.resultcomitteeno
            // res.resultcomitteefile.forEach(
            //   (element: any, index: any) => {
            //     if (res.resultcomitteefile) {
            //       const json: any = res.resultcomitteefile;
            //       if (json) {
            //         element.fileid = json[index]?.fileid;
            //         element.filename = json[index]?.filename;
            //       }
            //     }
            //   }
            // );
            res.resultcomitteefile        = jsonParse(res.resultcomitteefile)
            res.resulttoaccuserfile       = jsonParse(res.resulttoaccuserfile)
            res.resulttoschoolfile        = jsonParse(res.resulttoschoolfile)
            res.resulttoaccusedfile       = jsonParse(res.resulttoaccusedfile) 
            res.resultcomitteedate        = res?.resultcomitteedate ? cleanUpDate( res?.resultcomitteedate ) : res.resultcomitteedate
            res.resulttoaccuserdate       = res?.resulttoaccuserdate ? cleanUpDate( res?.resulttoaccuserdate ) : res.resulttoaccuserdate
            res.resulttoschooldate        = res?.resulttoschooldate ? cleanUpDate( res?.resulttoschooldate ) : res.resulttoschooldate
            res.resulttoaccuseddate       = res?.resulttoaccuseddate ? cleanUpDate( res?.resulttoaccuseddate ) : res.resulttoaccuseddate             
            res.resultdetail              = res.resultdetail 
            res.resultstartsuspendlicensedate   = res?.resultstartsuspendlicensedate ? cleanUpDate( res?.resultstartsuspendlicensedate ) : res.resultstartsuspendlicensedate    
            res.resultendsuspendlicensedate     = res?.resultendsuspendlicensedate ? cleanUpDate( res?.resultendsuspendlicensedate ) : res.resultendsuspendlicensedate
            res.resulttoaccusednotificationdate = res?.resulttoaccusednotificationdate ? cleanUpDate( res?.resulttoaccusednotificationdate ) : res.resulttoaccusednotificationdate
            res.resultacademicname              = res.resultacademicname 
            res.resultaffiliationname           = res.resultaffiliationname 
            res.resulttoschoolnotificationdate  = res?.resulttoschoolnotificationdate ? cleanUpDate( res?.resulttoschoolnotificationdate ) : res.resulttoschoolnotificationdate
            // ----------------------------------------------- Fill Accused Info
            // if(res?.licenseinfo){
            //   this.accusation.setAccusedInfo(res?.licenseinfo)
            // }
            if( typeof res?.licenseinfo == "string"){
              res.licenseinfo = jsonParse(res.licenseinfo)
            }        
            if( isArray( res?.licenseinfo )){
              for(let accused of res.licenseinfo){
                this.accusation.addAccusedRow()
              }
            }
            // ----------------------------------------------- Fill Files Upload
            this.accusation.accusationFiles.forEach((element, index) => {
              if (res.accusationfile && res.accusationfile.length > 0) {
                  const dataobj: any = res.accusationfile;
                    element.fileid = dataobj[index]?.fileid;
                  element.filename = dataobj[index]?.filename;
              }
            });
            // ----------------------------------------------- Fill Accusation user info
            if (res?.accuserinfo) {
              const dataobj = typeof res?.accuserinfo !== "object" ? jsonParse(res?.accuserinfo) : res?.accuserinfo
              if (dataobj && dataobj.length) {
                for (let i = 0; i < dataobj.length; i++) {
                  this.accusation.addRow();
                }
              }
              res.accuserinfo = dataobj
            }
            if( typeof res?.accusationcondemnation == "string"){
              res.accusationcondemnation = jsonParse(res.accusationcondemnation)
            }  
            if( isArray( res?.accusationcondemnation )){
              for(let condemnation of res?.accusationcondemnation){
                this.accusation.addCondemnationRow()
              }
            }
            // ----------------------------------------------- Accusation consideration
            if( typeof res?.accusationconsideration == "string"){
              res.accusationconsideration = jsonParse(res.accusationconsideration)
            }  
            // -----------------------------------------------
            if (res?.investigationresult) {
              res.investigationresult = typeof res?.investigationresult !== "object" ? jsonParse(res?.investigationresult) : res?.investigationresult;
            }
            // -----------------------------------------------
            if (res?.investigationsubcommittee) {
              const dataobj = typeof res?.investigationsubcommittee !== "object" ? jsonParse(res?.investigationsubcommittee) : res?.investigationsubcommittee
              if (dataobj?.length) {
                for (let i = 0; i < dataobj.length; i++) {
                  this.investigation.addRow();
                }
              }
              res.investigationsubcommittee = dataobj;
            }
            // -----------------------------------------------
            if (res?.inquiryresult) {
              res.inquiryresult = typeof res?.inquiryresult !== "object" ? jsonParse(res?.inquiryresult) : res?.inquiryresult;
            }
            // -----------------------------------------------
            if (res.inquirysubcommittee) {
              const dataobj = typeof res?.inquirysubcommittee !== "object" ? jsonParse(res?.inquirysubcommittee) : res?.inquirysubcommittee
              if (dataobj?.length) {
                for (let i = 0; i < dataobj.length; i++) {
                  this.inquiry.addRow();
                }
              }
              res.inquirysubcommittee = dataobj;
            }
            if(res.inquerymeetinghistory){
              const dataobj = typeof res?.inquerymeetinghistory !== "object" ? jsonParse(res?.inquerymeetinghistory) : res?.inquerymeetinghistory
              if (dataobj?.length) {
                for (let i = 0; i < dataobj.length; i++) {
                  this.inquiry.addConsiderRow();
                }
              }
              res.inquerymeetinghistory = dataobj;
            }
            // if( typeof res?.accusationaction == "string"){
            //   res.accusationaction = jsonParse(res.accusationaction)
            // }              
            if( typeof res?.accusationaction == "string"){
              res.accusationaction = jsonParse(res.accusationaction)
            }  
            this.allegation.setAccusationAction(res.accusationaction)

            this.form.controls.inquiry.patchValue(res);
            this.form.controls.inquiryResult.patchValue(res);
            this.form.controls.accusation.patchValue(res);
            this.form.controls.investigation.patchValue(res);
            this.form.controls.allegation.patchValue(res);
          });
      }
    });
  }
}
// ------------------------------------------------------------------------------------------------------
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