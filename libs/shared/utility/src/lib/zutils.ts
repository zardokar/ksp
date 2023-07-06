
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