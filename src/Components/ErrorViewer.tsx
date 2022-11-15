import { useEffect, useState } from "react"
import { subscribeToErrorBroadcast, unsubscribeFromErrorBroadcast } from "../Services/ErrorService"

export function ErrorViewer() {
    const [errors, setErrors] = useState<Array<string>>([])


    useEffect(()=>{
        const onErrorHandler = (e:string)=>{
            errors.push(e)
            setErrors([...errors])
        }

        subscribeToErrorBroadcast(onErrorHandler)

        setInterval(()=>{
            errors.pop()
            setErrors([...errors])
        },3000)

       return unsubscribeFromErrorBroadcast(onErrorHandler)
    }, [])


    return <div className="h-fit w-[30vw] absolute right-0 z-20 p-5 mt-24 grid gap-2">
        {errors.map((e,i)=><div key={i}
         className="bg-red rounded-lg min-h-max break-words p-3 text-white text-lg">
            {e}</div>)}
        
    </div>
}