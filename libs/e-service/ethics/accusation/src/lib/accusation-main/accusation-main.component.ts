import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ethics , accusationtypeList } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { EthicsService } from '@ksp/shared/service';
import {
  jsonParse,
  mapFileInfo,
  replaceEmptyWithNull,
  zdtform
} from '@ksp/shared/utility';
import { EMPTY, switchMap } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import _, { isArray } from 'lodash';
import { AccusationRecordComponent } from '../accusation-record/accusation-record.component';
import moment from 'moment';

@UntilDestroy()
@Component({
  selector: 'e-service-accusation-main',
  templateUrl: './accusation-main.component.html',
  styleUrls: ['./accusation-main.component.scss'],
})
export class AccusationMainComponent implements OnInit {
  ethicsId!: number;

  form = this.fb.group({
    accusation: [] as any,
  });
  @ViewChild(AccusationRecordComponent)
  accusation!: AccusationRecordComponent;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}

  ngOnInit(): void {
    // this.checkRequestId();
    // this.form.valueChanges.subscribe((res) => {
      // console.log(res);
      // console.log('form value = ', this.form.controls.accusation.value);
    // });
  }

  ngAfterViewInit( ) : void{
    this.checkRequestId();
    this.form.valueChanges.subscribe((res) => {
      // console.log(res);
      // console.log('form value = ', this.form.controls.accusation.value);
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
        this.router.navigate(['/accusation']);
      }
    });
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res) => {

          this.accusation.accusationFiles.forEach(
            (element: any, index: any) => {
              if (res.accusationfile) {
                const json: any = res?.accusationfile;
                if (json) {
                  element.fileid = json[index]?.fileid;
                  element.filename = json[index]?.filename;
                }
              }
            }
          );
          if( typeof res?.accuserinfo == "string"){
            res.accuserinfo = jsonParse(res.accuserinfo)
          }  
          if( isArray( res?.accuserinfo )){
            for(let accuser of res?.accuserinfo){
              this.accusation.addRow()
            }
          }
          if( typeof res?.licenseinfo == "string"){
            res.licenseinfo = jsonParse(res.licenseinfo)
          }  
          if( isArray( res?.licenseinfo )){
            for(let accused of res?.licenseinfo){
              this.accusation.addAccusedRow()
            }
          }

          if( typeof res?.accusationcondemnation == "string"){
            res.accusationcondemnation = jsonParse(res.accusationcondemnation)
          } 
          
          if( isArray( res?.accusationcondemnation )){

            for(let condemnation of res?.accusationcondemnation){
              this.accusation.addCondemnationRow()
            }
          }

          if( typeof res?.accusationconsideration == "string"){
            res.accusationconsideration = jsonParse(res.accusationconsideration)
          }  

          // this.accusation.setAddressInfo(res?.addressinfo ? res.addressinfo : {})
          // this.accusation.getAddressInfo(res?.licenseinfo)
          if (res?.investigationresult) {
            const json = jsonParse(res?.investigationresult);
            res.investigationresult = json;
          }
          // res.accusationincidentdate = moment(res?.accusationincidentdate).toISOString()
          // res.accusationassigndate = moment(res?.accusationassigndate).toISOString()
          // res.accusationissuedate = moment(res?.accusationissuedate).toISOString()

          res.accusationassigndate      = cleanUpDate( res?.accusationassigndate as any )
          res.accusationincidentdate    = cleanUpDate( res?.accusationincidentdate as any )
          res.accusationissuedate       = cleanUpDate( res?.accusationissuedate as any )
          if (res?.accusationreceiveddate) {
            res.accusationreceiveddate    = cleanUpDate( res?.accusationreceiveddate as any )
          }
          
          
          // if( typeof res?.accusationaction == "string"){
          //   res.accusationaction = jsonParse(res.accusationaction)
          // }  
          
          this.form.controls.accusation.patchValue(res);
        });
      }
    });
  }

  saveEthics() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูลใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      // .pipe(
        // switchMap((res) => {
    const ethics = new Ethics();
    const allowKey = Object.keys(ethics);
    const data = this.form.controls.accusation.value as any;
    // const idno = document.getElementById("person-idno") as HTMLInputElement;
    // const nameth = document.getElementById("person-nameth") as HTMLButtonElement;
    // const nameen = document.getElementById("person-nameen") as HTMLInputElement;
    // const gender = document.getElementById("person-gender") as HTMLButtonElement;
    // const birthdate = document.getElementById("person-birthdate") as HTMLInputElement;
    // const phone = document.getElementById("person-phone") as HTMLButtonElement;
    // const email = document.getElementById("person-email") as HTMLButtonElement;
    // const image = document.getElementById("person-img") as HTMLButtonElement;
    // const objPerson = {
    //    identitynumber : idno.innerText,
    //    nameth : nameth.innerText,
    //    nameen : nameen.innerText,
    //    email : email.innerText,
    //    phonenumber : phone.innerText,
    //    birthdate : birthdate.innerText,
    //    genderid : gender.innerText,
    //    profileimage : image.getAttribute("src")
    // }

    data.processid = '1'  // Set default first process

    if (data?.licenseinfo) {
      data.licenseinfo = JSON.stringify(data?.licenseinfo);
    }
    if (data?.accuserinfo) {
      data.accuserinfo = JSON.stringify(data?.accuserinfo);
    }
    if (data?.accusedinfo) {
      data.accusedinfo = JSON.stringify(data?.accusedinfo);
    }

    if (data?.accusationaction) {
      
      // const getKeyAction  = Object.keys( data?.accusationaction )
      // for(const actionType of getKeyAction){
      //   data.accusationaction[actionType]  = data?.accusationaction[actionType] !== null ? true : false
      // }
      
      data.accusationaction = JSON.stringify(data?.accusationaction);
    }

    if (data?.accusationcondemnation) {
      data.accusationcondemnationtype = 0
      data.accusationcondemnation = JSON.stringify(data?.accusationcondemnation);
    }
    if (data?.accusationconsideration) {
      data.accusationconsideration = JSON.stringify(data?.accusationconsideration);
    }

    data.accusationassigndate      = cleanUpDate( data?.accusationassigndate as any )
    data.accusationincidentdate    = cleanUpDate( data?.accusationincidentdate as any )
    data.accusationissuedate       = cleanUpDate( data?.accusationissuedate as any )
    data.accusationreceiveddate    = cleanUpDate( data?.accusationreceiveddate as any )
    

    data.accusationfile = JSON.stringify(
      mapFileInfo(this.accusation.accusationFiles)
    );
    const selectData = _.pick(data, allowKey);
    // selectData['licenseinfo']  =  JSON.stringify(  );
    if (this.ethicsId) {
      selectData['id'] = this.ethicsId;
      // const payload = replaceEmptyWithNull(selectData);
      console.log("Log payload update" , selectData);
      this.service.updateEthicsAccusation(selectData).subscribe((res) => {
        console.log('save = ', res);
        this.onCompleted()

      });
    } else {
      
      console.log("Log payload insert" , selectData);
      this.service.createEthics(selectData).subscribe((res) => {
        console.log("Response insert ::",res);
        const id = res.datareturn.id;
        if (id) {
          this.onCompleted()
          // this.router.navigate(['/accusation', 'detail', id]);
        }
      });
    }
    })
    // )

  }

  next() {
    this.router.navigate(['/accusation', 'decision', this.ethicsId || '']);
  }

  cancel() {
    this.router.navigate(['/accusation']);
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