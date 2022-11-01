import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EUniService {
  constructor(private http: HttpClient) {}

  getUniDegreeCertById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/unidegreecertselectbyid`, {
        id: id,
        tokenkey: getCookie('userToken'),
      }
    );
  }  

  getAdmissionCount(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreeadmissionsearchcount_es.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getAdmissionListById(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unirequestadmissionsearch_es.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getGraduateListById(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreeadmissionsearchall_es.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  requestProcessInsert(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/ksprequestprocessinsert_unirequestadmission`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  insertStudent(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/unidegreeadmissioninsert`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getProcessHistory(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/ksprequestprocessselectbyrequestid_requestadmission`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getDegreeCertList(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreecertsearch_es.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }
}