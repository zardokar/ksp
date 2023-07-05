// ------------------------------------------------------
const MONTHS: any[any] = {
    "en": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    "th": ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
}
const TH_NUM = { "0": "๐", "1": '๑', "2": "๒", "3": '๓', "4": '๔', "5": '๕', "6": '๖', "7": '๗', "8": '๘', "9": '๙' }
const DAY_NAMES = {
    "en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "th": ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."]
}
const YEAR_FACTOR: any[any] ={
    "ad": 0,
    "ce": 0,
    "be": 543
}
const YEAR_NAME: any[any] = {
    th :{
        "ad": 'ค.ศ.',
        "ce": 'ส.ศ.',
        "be": 'พ.ศ.'
    },
    en : {
        "ad": 'A.D.',
        "ce": 'C.E.',
        "be": 'B.E.'
    }
}
// ------------------------------------------------------
const MULTIPLIER_TIME    = 1000
const UNIXTIME_CONDITION = 9999000000
const TIME_FORMAT        = `T00:00:00.000`
const BE_FACT            = 543
const BE_MIN             = BE_FACT - 100
const REGEX_DATE         = /\/|-/g

const FORMAT_KEY = {
                          W3C: 'W3C',
                        W3CMS: 'W3CMS',
                          UTC: 'UTC',
                       UTC_MS: 'UTC_MS',
                      ISO8601: 'ISO8601',
                     ISO8601N: 'ISO8601N',
                        EPOCH: 'EPOCH',
                         UNIX: 'UNIX',
                  DATETIMEOBJ: 'DATETIMEOBJ'
}

// ------------------------------------------------------
function pad(norm: any,fact='00'){   
    let padding = 1
    for( let i=0 ; i < ((''+fact).length)-1 ; i++){
        padding *= 10
        if(norm < padding) norm = '0' + norm
    }
    return ''+norm
}

function pad2(num: number){
    return pad( Math.floor(Math.abs(num)) , '00' )
}

function pad3(num: number){
    return pad( Math.floor(Math.abs(num)) , '000' )
}

// ------------------------------------------------------
function formating(strIndex : string, year : any, month: any, date: any, hour: any,min: any,sec: any ,milsec: any, dif: any,tzo: any)
{
    const dateform     = `${year}-${pad2(month)}-${pad2(date)}`
    let   timeform     = `T${pad2(hour)}:${ pad2(min)}:${pad2(sec)}`
    let   result       = ''

    if(strIndex.toUpperCase() === FORMAT_KEY.W3CMS)
        timeform     =`T${pad2(hour)}:${ pad2(min)}:${pad2(sec)}.${pad3(milsec)}`

    switch(strIndex.toUpperCase()){
        case FORMAT_KEY.W3C     :
        case FORMAT_KEY.W3CMS   : result = dateform +timeform+`${dif}${pad2(tzo / 60)}:${pad2(tzo % 60)}`
                            break
        case FORMAT_KEY.UTC     : result = dateform +timeform+'Z' 
                            break
        case FORMAT_KEY.UTC_MS  : result = `${dateform}${timeform}.${pad3(milsec)}Z` 
                            break
        case FORMAT_KEY.ISO8601 : result = dateform + timeform + dif + pad2(tzo / 60) + pad2(tzo % 60)
                            break
        case FORMAT_KEY.EPOCH   :
        case FORMAT_KEY.UNIX    : result = `${Math.floor( new Date(`${dateform}${timeform}${dif}${pad2(tzo / 60)}:${pad2(tzo % 60)}`).getTime() / MULTIPLIER_TIME)}`
                            break
    }
    
    return result
}

// ------------------------------------------------------
function getDateTime(dateobj: any, offset = null , format='W3CMS')
{
    let result = null
    let tempdt

    try { 
        if(dateobj.getFullYear() !== undefined)     // Checking DateTime object data with DateTime method
            tempdt = dateobj
    } catch(err) {
        if(dateobj === null || dateobj === undefined ||  dateobj.length < 1 || Object.keys(dateobj).length < 1 )
            tempdt = new Date()

        if(typeof dateobj === 'string' && dateobj.length > 0)
        {
            if(dateobj.match(/:/g) === null){  
                dateobj = dateobj+TIME_FORMAT 
                const tzo = offset === null ? -(new Date()).getTimezoneOffset() : offset*60
                const dif = tzo >= 0 ? '+' : '-'
                dateobj += offset === null ? '' : `${dif}${ pad2(offset) }:00`
            }
            tempdt  = new Date(dateobj)
        }
        
        if(typeof dateobj === 'number')
            tempdt = dateobj > UNIXTIME_CONDITION ? new Date(dateobj) :  new Date(dateobj*MULTIPLIER_TIME)
    }

    // Check data is ready and not 'DATETIMEOBJ' in format option
    if (tempdt !== undefined && tempdt !== null && format.toUpperCase() !== FORMAT_KEY.DATETIMEOBJ )
    {
        const tzo   = offset === null ? -tempdt.getTimezoneOffset() : offset*60

        const dif   = tzo >= 0 ? '+' : '-'
        const month = tempdt.getMonth() + 1
        let   hour  = tempdt.getUTCHours()+offset
            
            if(format !== 'UTC'){
                hour  = (tzo !== -tempdt.getTimezoneOffset()) ? tempdt.getUTCHours()+offset : tempdt.getHours()
            }
            
            hour  = hour >= 24 ? 0 : hour
        
            result = formating( format, 
                                tempdt.getFullYear(), 
                                month, 
                                tempdt.getDate(), 
                                hour, 
                                tempdt.getMinutes(), 
                                tempdt.getSeconds(), 
                                tempdt.getMilliseconds(),
                                dif,tzo)
    }

    // If format === DATETIMEOBJ will return js datetime object
    if(format.toUpperCase() === FORMAT_KEY.DATETIMEOBJ) result = tempdt
    
    return result
}

// ------------------------------------------------------
function now()
{
    return getDateTime(null)
}

// ------------------------------------------------------
/**
  * Return string of date only. ex: 2018-03-08 14:17:35 -> 2018-03-08 (for input to DATE type of mysqlDB) However if value be null or undefined this function will return ""
  * @param datedata {String} value of datetime 
  * @return {String} date will be YYYY-MM-DD only 
  */
 function onlyDate(datedata: any)
 {
     if (datedata == '0000-00-00' || datedata === null || typeof datedata === 'undefined') {
         return ""
     } 
 
     const datestr = new Date(datedata)
     const month   = pad( (datestr.getMonth()+1).toString() , '00' )
     const date    = pad( (datestr.getDate()).toString() , '00' )
     
     return datestr.getFullYear()+"-"+month+"-"+date

 }

 // -------------------------------------------------------

function getDatefromInput(datestr: string)
{
    const startdateSTRA = datestr.split(REGEX_DATE)

    const now           = new Date()
    let year,date

    // Check index 0 is day and index 2 is year
    if( (now.getFullYear() - (parseInt(startdateSTRA[0])*2) ) > BE_MIN  && parseInt(startdateSTRA[2]) - BE_MIN > 0  ){
        year            = convertBEtoAD ( startdateSTRA[2] )
        date            = pad(parseInt(startdateSTRA[0]))

    }else{
        year            = convertBEtoAD ( startdateSTRA[0] )
        date            = pad(parseInt(startdateSTRA[2]))
    }

    return `${year}-${ pad( parseInt( startdateSTRA[1] )) }-${ date }`
}

// -------------------------------------------------------
function getDateFormattoInput(datestr : string,symbol='/',format='DDMMYYYY')
{
    const dateform = getDatefromInput(datestr)
    const date     = new Date(dateform)
    let result   = ''

    if(format === 'DDMMYYYY')   
        result = `${ pad(date.getDate()) }${symbol}${ pad(date.getMonth()+1) }${symbol}${ pad(date.getFullYear()) }`
    else
        result = `${ pad(date.getFullYear()) }${symbol}${ pad(date.getMonth()+1) }${symbol}${ pad(date.getDate()) }`

    return result
}

// -------------------------------------------------------
function getDateTimefromInput(datestr: string, offset: any = null , format='W3CMS')
{
    return getDateTime( getDatefromInput(datestr) ,offset,format)
}

// -------------------------------------------------------
function convertBEtoAD(value: string)
{
    const nvalue =  parseInt(value)
    return nvalue - (new Date()).getFullYear() > BE_MIN ?  nvalue - BE_FACT : value
}

// -------------------------------------------------------
function from(value: any, format='W3CMS' ,offset:any =0)
{
    if(typeof value === 'string')
        value = getDatefromInput(value)
    
    return getDateTime(value, offset, format)
}
// ------------------------------------------------------
function convertDateStrtoDTStr(valuestr: string, form="", yearfactor='ad')
{
    let ystr = ''
    let mstr = ''
    let dstr = ''
    const yfact= YEAR_FACTOR[yearfactor] || 0
    const now  = new Date()

    const targetsplit   = valuestr.split('')

    form                = form.toUpperCase()
    const splitdata     = form.split('')

    splitdata.map( (char: string,count:number ) => {  
        if( char === 'Y')   ystr += targetsplit[count]
        if( char === 'M')   mstr += targetsplit[count]
        if( char === 'D')   dstr += targetsplit[count]
    })

    if( now.getFullYear() > parseInt(ystr) )    
        ystr = `${ (now.getFullYear()-parseInt(ystr)) + parseInt(ystr)  }`

    const date: any = new Date(`${ parseInt(ystr) - yfact }-${mstr}-${dstr}`)

    if(isNaN(date) || typeof date == 'undefined')
        return ""
    else
        return `${date.getFullYear()}-${(pad(date.getMonth()+1))}-${pad(date.getDate())}T00:00:00.000Z`
}
// ------------------------------------------------------
function convertDateForm(data: any, lang='en', yearfactor='ad',format='DDMMYYYY', symbol='/')
{       
        lang     = lang.toLowerCase()
    yearfactor   = yearfactor.toLowerCase()   

    const date   = typeof data === 'string' ?  new Date(data) : data
    let result   = ''
    const yfact  = YEAR_FACTOR[yearfactor] || 0

    const yname  = YEAR_NAME[lang][yearfactor]
        format   = format.toUpperCase()

    try{
        if(format === 'DDMMYYYY')   
            result = `${ pad(date.getDate()) }${symbol}${ pad(date.getMonth()+1) }${symbol}${ pad(date.getFullYear() + yfact) }`
        else if(format === 'DMYYYY'){
            result = `${ date.getDate() }${symbol}${ date.getMonth()+1 }${symbol}${ pad(date.getFullYear() + yfact) }`
        }
        else if(format === 'D MMMM YYYY'){
            symbol = ' '
            result = `${ date.getDate() }${symbol}${ MONTHS[lang][ date.getMonth() ]  }${symbol}${ pad(date.getFullYear() + yfact) }`
        }else if(format === 'DD MMMM YYYY'){
            symbol = ' '
            result = `${ pad(date.getDate()) }${symbol}${ MONTHS[lang][ date.getMonth() ]  }${symbol}${ pad(date.getFullYear() + yfact) }`
        }else if(format === 'D MMMM YN YYYY'){
            symbol = ' '
            result = `${ date.getDate() }${symbol}${ MONTHS[lang][ date.getMonth() ]  }${symbol}${yname}${symbol}${ pad(date.getFullYear() + yfact) }`
        }else if(format === 'DD MMMM YN YYYY'){
            symbol = ' '
            result = `${ pad(date.getDate()) }${symbol}${ MONTHS[lang][ date.getMonth() ]  }${symbol}${yname}${symbol}${ pad(date.getFullYear() + yfact) }`
        }else if(format === 'MMMM YYYY'){
            symbol = ' '
            result = `${ MONTHS[lang][ date.getMonth() ] }${symbol}${ pad(date.getFullYear() + yfact) }`
        }else
            result = `${ pad(date.getFullYear()) }${symbol}${ pad(date.getMonth()+1) }${symbol}${ pad(date.getDate() + yfact) }`
    }catch(excp){ 
        // console.log( `data: ${data} | date: ${date} \n Error in convertDateForm() : `, excp )
    }

    return result
}

// ------------------------------------------------------
export const zdtform = {
    now,
    pad,
    from,
    formating,
    getDateTime,
    onlyDate,
    convertDateForm,
    getDatefromInput,
    getDateTimefromInput,
    getDateFormattoInput,
    convertDateStrtoDTStr
}