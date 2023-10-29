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
@Component({
  selector: 'e-service-publish-review',
  templateUrl: './publish-review.component.html',
  styleUrls: ['./publish-review.component.scss'],
})
export class PublishReviewComponent implements OnInit {
  form = this.fb.group({
    publishstatus: [],
    inquiry: [],
    inquiryResult: [],
    accusation: [],
    investigation: [],
    allegation: []
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
            const publishstatus = this.form.controls.publishstatus.value;
            const payload = {
              id: this.ethicsId,
              processid: '5',
              publishstatus,
              publishdate: new Date().toISOString().split('T')[0],
            };
            return this.service.updateEthicsAccusation(replaceEmptyWithNull (payload));
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log( 'public', res)
          this.onCompleted();
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
        this.router.navigate(['/', 'publish', 'list']);
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
            res.createdate                = cleanUpDate( res.createdate )
            // res.licenseinfo               = jsonParse(res.licenseinfo)
            res.accusationassigndate      = cleanUpDate( res.accusationassigndate )
            res.accusationincidentdate    = cleanUpDate( res.accusationincidentdate )
            res.accusationissuedate       = cleanUpDate( res.accusationissuedate )
            res.inquiryjbdate             = cleanUpDate( res.inquiryjbdate )
            res.inquiryorderdate          = cleanUpDate( res.inquiryorderdate )
            res.investigationdate         = cleanUpDate( res.investigationdate )
            res.investigationreportdate   = cleanUpDate( res.investigationreportdate)
            res.investigationorderdate    = cleanUpDate( res.investigationorderdate)
            res.investigationaction       = jsonParse(res.investigationaction)
            res.inquerylicensestatus                      = res.inquerylicensestatus;
            res.inquerylicensestatusnotificationdate      = cleanUpDate( res.inquerylicensestatusnotificationdate );
            res.inquerylicensestatusaccusedrecognizedate  = cleanUpDate(res.inquerylicensestatusaccusedrecognizedate);
            res.inquiryorderno                            = res.inquiryorderno;
            res.inquiryexplaindate                        = cleanUpDate(res.inquiryexplaindate);
            res.inquiryreport                             = res.inquiryreport;
            res.inquiryfile                               = jsonParse(res.inquiryfile);
            res.inquerylicensesuspendnotificationdate     = cleanUpDate(res.inquerylicensesuspendnotificationdate);
            res.inquerylicensesuspendrecognizedate        = cleanUpDate(res.inquerylicensesuspendrecognizedate);
            res.inquerynotificationdate                   = cleanUpDate(res.inquerynotificationdate);

            res.resultredno               = res.resultredno
            res.resultblackno             = res.resultblackno
            res.resultcomitteeno          = res.resultcomitteeno
            res.resultcomitteefile        = res.resultcomitteefile 
            res.resulttoaccuserfile       = res.resulttoaccuserfile 
            res.resulttoschoolfile        = res.resulttoschoolfile 
            res.resulttoaccusedfile       = res.resulttoaccusedfile 
            res.resultcomitteedate        = cleanUpDate( res.resultcomitteedate )
            res.resulttoaccuserdate       = cleanUpDate( res.resulttoaccuserdate )
            res.resulttoschooldate        = cleanUpDate( res.resulttoschooldate )
            res.resulttoaccuseddate       = cleanUpDate( res.resulttoaccuseddate )              
            res.resultdetail              = res.resultdetail 
            res.resultstartsuspendlicensedate   = cleanUpDate( res.resultstartsuspendlicensedate ) 
            res.resultendsuspendlicensedate     = cleanUpDate( res.resultendsuspendlicensedate )
            res.resulttoaccusednotificationdate = cleanUpDate( res.resulttoaccusednotificationdate )
            res.resultacademicname              = res.resultacademicname 
            res.resultaffiliationname           = res.resultaffiliationname 
            res.resulttoschoolnotificationdate  = cleanUpDate( res.resulttoschoolnotificationdate )

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
            this.allegation.setAccusationAction(res.accusationaction)     

            this.form.controls.inquiry.patchValue(res);
            this.form.controls.inquiryResult.patchValue(res);
            this.form.controls.accusation.patchValue(res);
            this.form.controls.investigation.patchValue(res);
            this.form.controls.allegation.patchValue(res);
            this.form.controls.publishstatus.patchValue(res.publishstatus);
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

