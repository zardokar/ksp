import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SchoolRequest } from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ERequestService {
  constructor(private http: HttpClient) {}

  searchRequest(payload: any): Observable<SchoolRequest[]> {
    return this.http
      .post(`${environment.apiUrl}/e-service/requestandschoolsearchs`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  getRequestById(requestId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/xxxxx`, {}).pipe(
      shareReplay(),
      map((data: any) => data.datareturn)
    );
  }

  checkRequest(requestId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/xxxxx`, {}).pipe(
      shareReplay(),
      map((data: any) => data.datareturn)
    );
  }
}
