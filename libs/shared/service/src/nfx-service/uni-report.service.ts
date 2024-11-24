
import axios from 'axios'
// -----------------------------------------------------------------
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
// -----------------------------------------------------------------
export class NFXUniReportService {

    static searchAdmission(payload: any) {

        payload.token = getCookie('userToken')

        return new Promise( (resolve) => {
            resolve(axios.post(`${environment.nfxUrl}/api/uni/admission/get`, payload ))
        })

      }
}
