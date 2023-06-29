import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ethics } from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import {
  jsonParse,
  mapFileInfo,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';
import _ from 'lodash';
import { AccusationRecordComponent } from '../accusation-record/accusation-record.component';
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
    this.checkRequestId();
    this.form.valueChanges.subscribe((res) => {
      // console.log('form value = ', this.form.controls.accusation.value);
    });
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        console.log("This ethicsId : " , this.ethicsId);
        console.log("This accusation" , this.accusation);
        this.service.getEthicsByID({ id: this.ethicsId }).subscribe((res) => {
          console.log("This res : " ,res);
          this.accusation.accusationFiles.forEach(
            (element: any, index: any) => {
              if (res.accusationfile) {
                const json: any = jsonParse(res?.accusationfile);
                if (json) {
                  element.fileid = json[index]?.fileid;
                  element.filename = json[index]?.filename;
                }
              }
            }
          );
          if(res?.accuserinfo){
            const json = jsonParse(res?.accuserinfo);
            console.log(json);
            res.accuserinfo = json;
          }
          if(res?.licenseinfo){
            const json: any = jsonParse(res?.licenseinfo);
            const idno = document.getElementById("person-idno") as HTMLInputElement;
            const nameth = document.getElementById("person-nameth") as HTMLButtonElement;
            const nameen = document.getElementById("person-nameen") as HTMLInputElement;
            const gender = document.getElementById("person-gender") as HTMLButtonElement;
            const birthdate = document.getElementById("person-birthdate") as HTMLInputElement;
            const phone = document.getElementById("person-phone") as HTMLButtonElement;
            const email = document.getElementById("person-email") as HTMLButtonElement;
            idno.innerText    = json.identitynumber !== undefined ? json.identitynumber : "--"
            nameth.innerText  = json.nameth !== undefined ? json.nameth : "--"
            nameen.innerText  = json.nameen !== undefined ? json.nameen : "--"
            gender.innerText  = json.genderid !== undefined ? json.genderid : "--"
            birthdate.innerText  = json?.birthdate !== undefined ? json.birthdate : "--"
            phone.innerText  = json.phonenumber !== undefined ? json.phonenumber : "--"
            email.innerText  = json.email !== undefined ? json.email : "--"
          }
          if (res?.investigationresult) {
            const json = jsonParse(res?.investigationresult);
            res.investigationresult = json;
          }
          this.form.controls.accusation.patchValue(res);
        });
      }
    });
  }

  saveEthics() {
    const ethics = new Ethics();
    const allowKey = Object.keys(ethics);
    const data = this.form.controls.accusation.value as any;
    const idno = document.getElementById("person-idno") as HTMLInputElement;
    const nameth = document.getElementById("person-nameth") as HTMLButtonElement;
    const nameen = document.getElementById("person-nameen") as HTMLInputElement;
    const gender = document.getElementById("person-gender") as HTMLButtonElement;
    const birthdate = document.getElementById("person-birthdate") as HTMLInputElement;
    const phone = document.getElementById("person-phone") as HTMLButtonElement;
    const email = document.getElementById("person-email") as HTMLButtonElement;
    // console.log("data in form :: " , idno.innerText);
    const objPerson = {
       identitynumber : idno.innerText,
       nameth : nameth.innerText,
       nameen : nameen.innerText,
       email : email.innerText,
       phonenumber : phone.innerText,
       birthdate : birthdate.innerText,
       genderid : gender.innerText
    }
    
    // console.log("data form accusation :: " , objPerson);
    if (data?.accuserinfo) {
      data.accuserinfo = JSON.stringify(data?.accuserinfo);
    }
    data.accusationfile = JSON.stringify(
      mapFileInfo(this.accusation.accusationFiles)
    );
    const selectData = _.pick(data, allowKey);
    if (this.ethicsId) {
      selectData['id'] = this.ethicsId;
      const payload = replaceEmptyWithNull(selectData);
      this.service.updateEthicsAccusation(payload).subscribe((res) => {
        console.log('save = ', res);
      });
    } else {
      selectData['licenseinfo']  =  JSON.stringify( objPerson );
      this.service.createEthics(selectData).subscribe((res) => {
        console.log("Response insert ::",res);
        const id = res.id;
        if (id) {
          this.router.navigate(['/accusation', 'detail', id]);
        }
      });
    }
  }

  next() {
    this.router.navigate(['/accusation', 'decision', this.ethicsId || '']);
  }

  cancel() {
    this.router.navigate(['/accusation']);
  }
}
