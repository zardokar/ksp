import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Ethics, EthicsKey , KspAccusationRequest } from '@ksp/shared/interface';
import { jsonParse } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EthicsService {
  constructor(private http: HttpClient) {}

  createEthics(payload: any): Observable<any> {
    console.log("create payload :: ",payload);
    return this.http.post(
      `${environment.shortApiUrl}/kspx/ethic/es_ethicsinsert.php`,
      payload
    );
  }
  updateEthicsAccusation(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.shortApiUrl}/kspx/ethic/es_ethicsupdate.php`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsInvestigation(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/e-service/es-ethicsupdate-investigation`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  searchSelfMyInfo(payload: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/kspx/ethic/selfmyinfosearch.php`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  searchSelfLicense(payload: any): Observable<any> {
    return this.http
        .post( `${environment.shortApiUrl}/kspx/ethic/es_licenseinfosearch.php`, payload)
        .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  searchEthicssearch(payload: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/kspx/ethic/es_ethicssearch_id.php`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsInquiry(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsupdate-inquiry`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsResult(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsupdate-result`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsPublish(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsupdate-publish`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  getEthicsByID(payload: any): Observable<Ethics> {
    // console.log( "This EthicsById Payload : " , payload );
    return this.http
      .post<Ethics>(
        `${environment.shortApiUrl}/kspx/ethic/es_ethicssearch_id.php`,
        payload
      )
      .pipe(map((data: any) => { 
        // console.log("This EthicsById Payload : " , data.datareturn);
        const ethicsArray = data.datareturn as Ethics[]
        return this.formatMyInfo( ethicsArray.find((rowdata)=>{
            const rawdata = rowdata
            // console.log("checkdata ::" , rawdata);
            return rawdata.id == payload.id 
        }) as Ethics )
      }));
      // .pipe(map((data) => this.formatMyInfo(data)));
  }
  formatMyInfo(info: Ethics): Ethics {
    const dateColumn = [
      'accusationincidentdate',
      'accusationissuedate',
      'accusationassigndate',

      'investigationrecognizedate',
      'investigationexplaindate',
      'investigationdate',
      'investigationreportdate',
      'inquiryorderdate',
      'inquiryexplaindate',
      'inquiryjbdate',
      'resultcomitteedate',
      'resulttoaccuserdate',
      'resulttoschooldate',
      'resulttoaccuseddate',
    ];
    const jsonColumn = [
      'licenseinfo',
      'accuserinfo',
      'accusationfile',
      'accusationconsideration',
      'investigationresult',
      'investigationsubcommittee',
      'inquiryresult',
      'inquirysubcommittee',
    ];
    for (const key in info) {
      const ethicsKey = key as EthicsKey;
      if (dateColumn.includes(key)) {
        if (info[ethicsKey]) {
          info[ethicsKey] = info[ethicsKey]?.split('T')[0] || null;
        }
      }
      if (jsonColumn.includes(key)) {
        if (info[ethicsKey]) {
          info[ethicsKey] = jsonParse(info[ethicsKey] as any);
          // info[ethicsKey] = atob(info[ethicsKey] as string);
        }
      }
    }
    // console.log('Info Here :',info);
    return info;
  }
}
