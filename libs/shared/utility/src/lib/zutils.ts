
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

// ----------------------------------------------------------------------------------------------
export function convertBase64toJSONStr(data: any, target_keys?: string[]) : any
{
    let result = data
    
    if( data instanceof Object ){
        target_keys?.map( (key) => {
            if(data[key]){
                data[key]   = atob(data[key])
                result[key] = data[key]
            }
        })
    }else if( typeof data === 'string'){
        result = b64DecodeUnicode(data) 
    }

    return result
}

// ----------------------------------------------------------------------------------------------
// Encoding UTF-8 ⇢ base64

export function b64EncodeUnicode( str: string) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

// ----------------------------------------------------------------------------------------------
// Decoding base64 ⇢ UTF-8
export function b64DecodeUnicode( str : string) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}