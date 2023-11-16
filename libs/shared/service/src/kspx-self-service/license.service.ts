import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
// -----------------------------------------------------------------
import { environment } from '@ksp/shared/environment';
// -----------------------------------------------------------------
@Injectable({
    providedIn: 'root',
})
// -----------------------------------------------------------------
export class KSPXLicenseService {
    constructor(private http: HttpClient) {}

    searchSelfLicense(payload: any): Observable<any> {
        return this.http
            .post( `${environment.shortApiUrl}/kspx/es_licenseinfosearch.php`, payload)
            .pipe(
            shareReplay(),
            map((data: any) => data.datareturn)
          );
      }
}
