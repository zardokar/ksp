import { PREFIX_EN, PREFIX_TH, STUDENT_STATUS } from "@ksp/shared/constant"
import { zdtform } from "@ksp/shared/utility"
// -----------------------------------------------------------------------------------------------------

export function getAdmissionDataTable( respdata : any[any])
{   
    const result : any[any] = []

    if(respdata && Array.isArray( respdata ))
    {
        respdata.map( (row : any, countind : number) => {


            const admis_date = zdtform.convertDateForm( row.ADMISSION_DATE, 'th', 'be', 'DD MMMM YYYY' )

            const item = {
                            no: countind+1
                            ,request_no     : row.REQUEST_NO
                            ,student_no     : row.STUDENT_NO
                            ,citizen_id     : row.ID_CARD_NO
                            ,nationality    : row.NATIONALITY
                            ,prefix_th      : PREFIX_TH[row.PREFIX_TH]
                            ,firstname_th   : row.FIRST_NAME_TH
                            ,lastname_th    : row.LAST_NAME_TH
                            ,prefix_en      : PREFIX_EN[row.PREFIX_EN]
                            ,firstname_en   : row.FIRST_NAME_EN
                            ,lastname_en    : row.LAST_NAME_EN
                            ,admission_date : admis_date
                            ,student_status : STUDENT_STATUS[row.STUDENT_STATUS]
                            ,uni_name       : row.UNI_NAME
                            ,degree_name_th : row.FULL_DEGREE_NAME_TH
                            ,course_major   : row.COURSE_MAJOR
                            ,course_subject : row.COURSE_SUBJECTS
                            ,course_field   : row.COURSE_FIELD_OF_STUDY
                         }
            result.push( item )
        })
    }

    return result
}