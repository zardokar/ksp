
// ----------------------------------------------------------------------------------------------
export function cleanUp(payload: any)
{
    const DEAFULT_VALUE = null

    Object.keys(payload).map( (item) => {
        if(typeof payload[item] === 'string'){
            payload[item] = payload[item].replace(/ /g,"")
            if( payload[item] === '' ) 
                payload[item] = DEAFULT_VALUE
        }
    })

    return payload
}

// ----------------------------------------------------------------------------------------------
export function converttoTHNumber(datestr: string)
{  
    const TH_NUM : any = { "0": "๐", "1": '๑', "2": "๒", "3": '๓', "4": '๔', "5": '๕', "6": '๖', "7": '๗', "8": '๘', "9": '๙' }
    let result = ''
    datestr.split('').map( item => {  
        result += TH_NUM[item] || item 
    })
    return result
}