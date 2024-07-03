import type { CSSProperties } from "react"

type Props = {
    className?: string,
    style?: CSSProperties
}
export function StepConnector(props:Props) {
    return <div className={`h-2 bg-white absolute top-9 -z-10 ${props.className}`} style={props.style}></div>
}