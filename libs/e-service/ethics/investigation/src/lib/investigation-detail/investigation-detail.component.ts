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
import { jsonParse, replaceEmptyWithNull } from '@ksp/shared/utility';
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
            payload.investigationresult = JSON.stringify(
              payload.investigationresult
            );
            payload.investigationsubcommittee = JSON.stringify(
              payload.investigationsubcommittee
            );
            payload.id = this.ethicsId;
            return this.service.updateEthicsAccusation( replaceEmptyWithNull(payload) )
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
        content: `วันที่ : 10 ตุลาคม 2656`,
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาเจรา ใกล้คุก',
        
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
            console.log(res);
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
                this.accusation.addCondemnationRow()
              }
            }
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
              this.allegation.setAccusationAction(res.accusationaction)
            }  
            // -----------------------------------------------
            
            this.form.controls.investigation.patchValue(res);
            this.form.controls.accusation.patchValue(res);
            this.form.controls.allegation.patchValue(res);
          });
      }
    });
  }
}
