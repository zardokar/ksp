import { Component }                    from '@angular/core';
import { UntilDestroy}                  from '@ngneat/until-destroy';
import { ActivatedRoute }               from '@angular/router';
import {DomSanitizer, SafeResourceUrl}  from '@angular/platform-browser';

import { zutils }                       from '@ksp/shared/utility';

// -----------------------------------------------------------------------------------
@UntilDestroy()
@Component({
  selector: 'ksp-uni-degree-report',
  templateUrl: './uni-degree-report.component.html',
  styleUrls: ['./uni-degree-report.component.scss']
})

export class UniDegreeReportComponent
{
  REPORTS : any = {
    'r1' : {
      label : 'รายชื่อสถาบันที่ได้รับการรับรองปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี) และปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/degree?type=1-2&isIframe=true'
    },
    'r2' : {
      label : 'รายชื่อสถาบันที่ได้รับการรับรองประกาศนียบัตรบัณฑิตวิชาชีพครู และประกาศนียบัตรบัณฑิตทางการบริหารการศึกษา',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/degree?type=3-4&isIframe=true'
    },
    'r3' : {
      label : 'รายชื่อสถาบันที่ได้รับการรับรองปริญญาโททางการศึกษา (วิชาชีพครู และวิชาชีพบริหาร) และปริญญาเอกทางการศึกษา (วิชาชีพครู และวิชาชีพบริหาร)',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/degree?type=5-6-7-8&isIframe=true'
    },
    'r4' : {
        label : 'รายงานหลักสูตร/ปริญญา ที่คุรุสภาให้การรับรอง (ขั้นสูง)',
        url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/degree/advance?isIframe=true'
    }
  }

  target_url : SafeResourceUrl  = ''
  target_label                  = ''

  constructor(
    private     route: ActivatedRoute,
    private sanitizer: DomSanitizer
    )
  {
    this.route.queryParamMap.subscribe( (res : any) => {
      if( zutils.exist( res.params, 'subtype' )  &&  zutils.exist( this.REPORTS, `r${res.params.subtype}`) )
      {
        const ind          = `r${res.params.subtype}`
        const url : string = this.REPORTS[ind].url 
        this.target_url    = this.sanitizer.bypassSecurityTrustResourceUrl(url)
        this.target_label  = this.REPORTS[ind].label
      }
    })
  }

}

