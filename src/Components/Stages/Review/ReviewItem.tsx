import { ReactChild } from "react"

type Props = {
    label: string,
    value: ReactChild | string
}
export function ReviewItem(props:Props) {
    return <div><span className="ml-2">{props.label}</span>: <span>{props.value}</span></div>
}