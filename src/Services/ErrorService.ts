const sups:((error:string)=>void)[]= []

export function broadcastError(error: string) {
    for(const sup of sups) {
        sup(error)
    }
    console.log(sups.length)
}


export function subscribeToErrorBroadcast(fn: (error:string)=>void) {
    sups.push(fn)
}


export function unsubscribeFromErrorBroadcast(fn: (error:string)=>void) {
    const index = sups.indexOf(fn)
    if(index>-1) {
        sups.splice(index,1)
    }
}