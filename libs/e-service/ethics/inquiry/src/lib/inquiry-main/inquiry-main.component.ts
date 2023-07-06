import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { FormInvestigationDetailComponent } from '@ksp/e-service/ethics/form';
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
  zdtform
} from '@ksp/shared/utility';
import { EMPTY, switchMap, zip } from 'rxjs';
import { InquiryDetailComponent } from '../inquiry-detail/inquiry-detail.component';
@Component({
  selector: 'e-service-inquiry-main',
  templateUrl: './inquiry-main.component.html',
  styleUrls: ['./inquiry-main.component.scss'],
})
export class InquiryMainComponent implements OnInit {
  form = this.fb.group({
    inquiry: [],
    inquiryresult: [],
    accusation: [],
    investigation: [],
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
              payload.id = this.ethicsId;
              payload.inquiryresult = JSON.stringify(payload.inquiryresult);
              payload.inquirysubcommittee = JSON.stringify( payload.inquirysubcommittee );
            }
            const payload2                = this.form.value.inquiryresult as any;
            if (payload2) {
              payload2.id                 = this.ethicsId;

              payload.resultredno         = payload2.resultredno
              payload.resultcomitteeno    = payload2.resultcomitteeno
              payload.resultcomitteedate  = cleanUpDate( payload2.resultcomitteedate )
              payload.resultcomitteefile  = payload2.resultcomitteefile 
              payload.resulttoaccuserdate = cleanUpDate( payload2.resulttoaccuserdate )
              payload.resulttoaccuserfile = payload2.resulttoaccuserfile 
              payload.resulttoschooldate  = cleanUpDate( payload2.resulttoschooldate )
              payload.resulttoschoolfile  = payload2.resulttoschoolfile 
              payload.resulttoaccuseddate = cleanUpDate( payload2.resulttoaccuseddate )
              payload.resulttoaccusedfile = payload2.resulttoaccusedfile 
            }

            this.collectFormData(payload) 
            console.log( `payload`, replaceEmptyWithNull(payload))
            console.log( `payload2`, payload2)
            

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

    payload.accusationfile            = JSON.stringify(payload.accusationfile)
    payload.accuserinfo               = JSON.stringify(payload.accuserinfo)
    payload.licenseinfo               = JSON.stringify(payload.licenseinfo)

    return payload
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        content: `เลขที่รายการ : 640120000123
        วันที่ : 10 ตุลาคม 2656`,
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาเจรา ใกล้คุก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }
  ngOnInit(): void {
    this.checkRequestId();
  }
  // ------------------------------------------------------------------------
  checkRequestId() {

    this.route.paramMap.subscribe( (params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res: any) => {

            console.log( res )
            // ----------------------------------------------- Cleaning Data
            res.createdate                = cleanUpDate( res.createdate )
            res.accusationassigndate      = cleanUpDate( res.accusationassigndate )
            res.accusationincidentdate    = cleanUpDate( res.accusationincidentdate )
            res.accusationissuedate       = cleanUpDate( res.accusationissuedate )
            res.inquiryjbdate             = cleanUpDate( res.inquiryjbdate )
            res.inquiryorderdate          = cleanUpDate( res.inquiryorderdate )
            res.investigationdate         = cleanUpDate( res.investigationdate )
            res.investigationreportdate   = cleanUpDate( res.investigationreportdate)
            res.investigationorderdate    = cleanUpDate( res.investigationorderdate)
            res.resultcomitteedate        = cleanUpDate( res.resultcomitteedate )
            res.resulttoaccuserdate       = cleanUpDate( res.resulttoaccuserdate )
            res.resulttoschooldate        = cleanUpDate( res.resulttoschooldate )
            res.resulttoaccuseddate       = cleanUpDate( res.resulttoaccuseddate )
            // ----------------------------------------------- Fill Accused Info
            if(res?.licenseinfo){
              this.accusation.setAccusedInfo(res?.licenseinfo)
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
            
            this.form.controls.accusation.patchValue(res);
            this.form.controls.inquiryresult.patchValue(res);
            this.form.controls.investigation.patchValue(res);
            this.form.controls.inquiry.patchValue(res);
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