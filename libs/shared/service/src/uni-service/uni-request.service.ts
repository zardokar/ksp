import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniRequestService {
  constructor(private http: HttpClient) {}

  createRequest(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/requestinsert`, form);
  }

  createRequestKsp(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/ksprequestinsert`, form);
  }

  saveRequestInsert(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/ksprequestinsert`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }
  uniRequestInsert(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestinsert`,
      params
    );
  }
  uniRequestUpdate(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestupdate`,
      params
    );
  }
  searchUniRequest(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/uniusersearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getUniDegreeCertById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unidegreecertselectbyid`, {
        id: id,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getUniRequestById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/ksprequestselectbyid`, {
        id: id,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  searchUniDegreeCert(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreecertsearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  searchUniDegreeCert2(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreecertsearch_2.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  createRequestAdmission(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/unirequestadmissioninsertupdate`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getAdmissionListById(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unirequestadmissionsearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getGraduatedListById(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreeadmissionsearchgraduation.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getGraduateListById(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreeadmissionsearchall.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getAdmissionCount(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unirequestadmissioncount.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getEditRequestAdmision(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unirequestadmissionjoinunidegreecertsearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getDegreeCertStatus(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unirequestadmissionunidegreecertsearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  uniRequestRegisterSearch(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/ksprequestsearch_other.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  kspSendEmailUni(form: any): Observable<any> {
    return this.http.post(`https://ksp-uniservice.ksp.or.th/mail/kspsendmail_uni.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }
}
