import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { InquiryDetailComponent ,InquiryResultComponent } from '@ksp/e-service/ethics/inquiry';
import { FormInvestigationDetailComponent , FormInvestigationAllegationComponent } from '@ksp/e-service/ethics/form';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import { jsonParse,
  thaiDate,
  jsonStringify,
  replaceEmptyWithNull,
  mapMultiFileInfo,
  zdtform } from '@ksp/shared/utility';
import { EMPTY, switchMap } from 'rxjs';
import _, { isArray } from 'lodash';
import moment from 'moment';
@Component({
  selector: 'e-service-publish-confirmation',
  templateUrl: './publish-confirmation.component.html',
  styleUrls: ['./publish-confirmation.component.scss'],
})
export class PublishConfirmationComponent implements OnInit {
  form = this.fb.group({
    confirmstatus: [],
    inquiry: [],
    inquiryResult: [],
    accusation: [],
    investigation: [],
    allegation:[]
  });
  ethicsId: any;
  today = thaiDate(new Date());
  constructor(
    public router: Router,
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
    this.router.navigate(['/', 'publish', 'list']);
  }
  ngOnInit(): void {
    // this.checkRequestId();
  }

  ngAfterViewInit(): void {
    this.checkRequestId();
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
            const confirmstatus = this.form.controls.confirmstatus.value;
            const payload = {
              id: this.ethicsId,
              processid : '4',
              confirmstatus,
              confirmdate: new Date().toISOString().split('T')[0],
            };
            return this.service.updateEthicsAccusation(payload);
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

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        content: ``,
        subContent: '',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'publish', 'confirmlist']);
      }
    });
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        this.service
          .getEthicsByID({ id: this.ethicsId })
          .subscribe((res: any) => {
            // console.log(res);

            res.createdate                = cleanUpDate( res.createdate )
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

            res.investigationaction                       = jsonParse(res.investigationaction)

            res.resultredno               = res.resultredno
            res.resultblackno             = res.resultblackno
            res.resultcomitteeno          = res.resultcomitteeno
            res.resultcomitteefile        = res.resultcomitteefile 
            res.resulttoaccuserfile       = res.resulttoaccuserfile 
            res.resulttoschoolfile        = res.resulttoschoolfile 
            res.resulttoaccusedfile       = res.resulttoaccusedfile 
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
            if( typeof res?.accusationaction == "string"){
              res.accusationaction = jsonParse(res.accusationaction)
            }     
            
            if( isArray(res?.accusationaction ) ){
              this.allegation.setAccusationAction(res.accusationaction)  
            }

            this.form.controls.inquiry.patchValue(res);
            this.form.controls.inquiryResult.patchValue(res);
            this.form.controls.accusation.patchValue(res);
            this.form.controls.investigation.patchValue(res);
            this.form.controls.allegation.patchValue(res);
            this.form.controls.confirmstatus.patchValue(res.confirmstatus);
          });
      }
    });
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
