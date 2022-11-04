import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  ESelfSearchPayload,
  EsSearchPayload,
  KspApprovePayload,
  KspRequest,
  KspResponse,
  KspKuruspa,
  SchUser,
  SelfRequest,
  UniUser,
} from '@ksp/shared/interface';
import { getCookie } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ERequestService {
  constructor(private http: HttpClient) {}

  // new API
  KspSearchRequest(payload: EsSearchPayload): Observable<KspRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/ksprequestsearch_es.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

  // new API
  KspUpdateRequestProcess(payload: KspApprovePayload): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessinsert`,
      payload
    );
  }

  // new API
  getKspRequestById(id: number): Observable<KspRequest> {
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/e-service/ksprequestselectbyid`,
      {
        id,
      }
    );
  }

  // new API
  getApproveHistory(requestid: string): Observable<SelfRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/ksprequestprocess_systemtype.php`, {
        requestid,
      })
      .pipe(map((data: any) => data.datareturn));
  }

  deActivateAllUser(schoolid: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/schuseractiveupdate`,
      {
        schoolid,
      }
    );
  }

  EsSearchRequest(payload: EsSearchPayload): Observable<SelfRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/schrequestsearch_e.php`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  searchSelfRequest(payload: ESelfSearchPayload): Observable<SelfRequest[]> {
    return this.http
      .post(
        `${environment.shortApiUrl}/schrequestsearch_e-service.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  getRequestById(requestId: number): Observable<SelfRequest> {
    return this.http.post<SelfRequest>(
      `${environment.apiUrl}/e-service/requestsearchbyrequestno`,
      {
        id: requestId,
      }
    );
  }

  createSchUser(payload: SchUser): Observable<KspResponse> {
    return this.http.post<KspResponse>(
      `${environment.apiUrl}/e-service/schuserinsert`,
      payload
    );
  }

  retiredUser(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/useractiveupdate`,
      payload
    );
  }

  createKuruspaNumber(payload: Partial<KspKuruspa>): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/schkuruspanoinsertupdate`,
      payload
    );
  }

  updateRequestKuruspaNo(
    id: string | null,
    kuruspano: string
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/updatekuruspano`, {
      id,
      kuruspano,
    });
  }

  createUniUser(payload: UniUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/uniuserinsert`, {
      ...payload,
      tokenkey: getCookie('userToken'),
    });
  }
  kspRequestProcessSelectByRequestId(requestid: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessselectbyrequestid`,
      { requestid, tokenkey: getCookie('userToken') }
    );
    }
}
