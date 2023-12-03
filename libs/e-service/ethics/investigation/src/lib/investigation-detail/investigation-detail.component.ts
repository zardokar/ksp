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
import { jsonParse, replaceEmptyWithNull , formatDatePayload , zdtform } from '@ksp/shared/utility';
import { EMPTY, switchMap } from 'rxjs';
import _, { isArray } from 'lodash';
@Component({
  selector: 'e-service-investigation-main',
  templateUrl: './investigation-detail.component.html',
  styleUrls: ['./investigation-detail.component.scss'],
})
export class InvestigationDetailComponent implements OnInit {
  form = this.fb.group({
    accusation: [],
    investigation: [],
    allegation:[],
    // allegationinformdate:[],
    // allegationaccusedinformdate:[]
  });
  ethicsId: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}
  @ViewChild(AccusationRecordComponent)
  accusation!: AccusationRecordComponent;
  @ViewChild(FormInvestigationDetailComponent)
  investigation!: FormInvestigationDetailComponent;
  @ViewChild(FormInvestigationAllegationComponent)
  allegation!: FormInvestigationAllegationComponent;
  ngOnInit(): void {
    // this.checkRequestId();
  }
  ngAfterViewInit( ) : void{
    this.checkRequestId();
  }
  cancel() {
    //this.form.valueChanges.subscribe((res) => console.log(' res = ', res));
    this.router.navigate(['/accusation']);
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
            const payload = this.form.value.investigation as any;
            const allegationValue = this.form.value.allegation as any
            const accusationValue = this.form.value.accusation as any
            payload.processid = '2'
            payload.investigationresult = JSON.stringify(
              payload.investigationresult
            );
            payload.investigationsubcommittee = JSON.stringify(
              payload.investigationsubcommittee
            );
            payload.investigationnotificationdate = allegationValue.investigationnotificationdate || null

            payload.investigationaccusedrecognizedate = allegationValue.investigationaccusedrecognizedate

            // payload.investigationnotificationdetail = JSON.stringify(
            //   allegationValue.investigationnotificationdetail
            // );
            payload.investigationnotificationdetail = allegationValue.investigationnotificationdetail
            payload.investigationnote = allegationValue.investigationnote
            // payload.investigationaction = allegationValue.investigationaction || null
            payload.investigationaction = JSON.stringify(
              allegationValue.investigationaction
            );

            payload.investigationdetail = allegationValue.investigationdetail

            if (payload?.accusationaction) {
      
              // const getKeyAction  = Object.keys( accusationValue?.accusationaction )
              // for(const actionType of getKeyAction){
              //   payload.accusationaction[actionType]  = accusationValue?.accusationaction[actionType] !== null ? true : false
              // }
              
              payload.accusationaction = JSON.stringify(accusationValue?.accusationaction);
            }
            payload.accusationcondemnation  = JSON.stringify(
              accusationValue.accusationcondemnation
            );
            payload.accusationconsideration  = JSON.stringify(
              accusationValue.accusationconsideration
            );
            payload.accusationfile  = JSON.stringify(
              accusationValue.accusationfile
            );
            payload.accuserinfo  = JSON.stringify(
              accusationValue.accuserinfo
            );
            payload.licenseinfo  = JSON.stringify(
              accusationValue.licenseinfo
            );
            payload.id = this.ethicsId;
            payload.investigationorderdate = cleanUpDate( payload.investigationorderdate )
            // return this.service.updateEthicsAccusation( replaceEmptyWithNull(payload) )
            return this.service.updateEthicsAccusation( payload )
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
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/investigation']);
      }
    });
  }
  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res: any) => {
            // ----------------------------------------------- Fill Accused Info
            // if(res?.licenseinfo){
            //   this.accusation.setAccusedInfo(res?.licenseinfo)
            // }
            if( typeof res?.licenseinfo == "string"){
              res.licenseinfo = jsonParse(res.licenseinfo)
            }  
            if( isArray( res?.licenseinfo )){
              for(let accused of res?.licenseinfo){
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
            // ----------------------------------------------- Accusation condemnation
            if( typeof res?.accusationcondemnation == "string"){
              res.accusationcondemnation = jsonParse(res.accusationcondemnation)
            }  

            if( isArray( res?.accusationcondemnation )){
              for(let condemnation of res?.accusationcondemnation){
                this.accusation.addCondemnationRow(res.accusationcondemnation)
              }
            }

            // if( typeof res?.accusationaction == "string"){
            //   res.accusationaction = jsonParse(res.accusationaction)
            // } 
            
            // ----------------------------------------------- Accusation consideration
            if( typeof res?.accusationconsideration == "string"){
              res.accusationconsideration = jsonParse(res.accusationconsideration)
            }  
            // -----------------------------------------------
            if (res?.investigationresult) {
              const dataobj = typeof res?.investigationresult !== "object" ? jsonParse(res?.investigationresult) : res?.investigationresult
              res.investigationresult = dataobj;
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
            if( typeof res?.accusationaction == "string"){
              res.accusationaction = jsonParse(res.accusationaction)        
              // this.allegation.setAccusationAction(res.accusationaction)
            }
            // -----------------------------------------------
            res.investigationaction = jsonParse(res.investigationaction)
            this.allegation.setAccusationAction(res.accusationaction)
            // res.investigationorderdate = cleanUpDate( res.investigationorderdate )
            // res.investigationrecognizedate = cleanUpDate( res.investigationrecognizedate )
            // res.investigationreportdate = cleanUpDate( res.investigationreportdate )
            // res.investigationnotificationdate = cleanUpDate( res.investigationnotificationdate )
            // res.investigationexplaindate = cleanUpDate( res.investigationexplaindate )
            // res.investigationdate = cleanUpDate( res.investigationdate )
            // res.investigationaccusedrecognizedate = cleanUpDate( res.investigationaccusedrecognizedate )
            //------------------------------------------------
            
            this.form.controls.investigation.patchValue(res);
            this.form.controls.accusation.patchValue(res);
            this.form.controls.allegation.patchValue(res);
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
