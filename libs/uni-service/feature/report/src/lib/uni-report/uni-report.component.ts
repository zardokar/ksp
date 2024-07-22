import { Component }   from '@angular/core';
import { UntilDestroy}                  from '@ngneat/until-destroy';
import { ActivatedRoute }               from '@angular/router';
import {DomSanitizer, SafeResourceUrl}  from "@angular/platform-browser";

import { zutils } from '@ksp/shared/utility';

// -----------------------------------------------------------------------------------
@UntilDestroy()
@Component({
  selector: 'ksp-uni-report',
  templateUrl: './uni-report.component.html',
  styleUrls: ['./uni-report.component.scss']
})
export class UniReportComponent
{
  REPORTS : any = {
    'r1' : {
      label : 'รายงานข้อมูลนักศึกษา',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/student?isIframe=true'
    },
    'r2' : {
      label : 'รายงานรายชื่อผู้เข้าศึกษา',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/student-admission?isIframe=true'
    },
    'r3' : {
      label : 'รายงานรายชื่อผู้สำเร็จศึกษา',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/student-admission/graduation?isIframe=true'
    },
    'r4' : {
      label : 'รายงานสถิติยอดตามหลักสูตรและมหาวิทยาลัย',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/course/summary?isIframe=true'
    },
    'r5' : {
      label : 'รายงานสถิติจำนวนผู้เข้าศึกษา แยกตามระดับปริญญาและเลือกปีการศึกษา',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/student-admission/summary?isIframe=true'
    },
    'r6' : {
      label : 'รายงานสถิติจำนวนผู้สำเร็จศึกษา แยกตามระดับปริญญาและเลือกปีการศึกษา',
      url : 'https://ksp-eservice-rp.zdklabs.io/report/v1.5/student-admission/graduation/summary?isIframe=true'
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

