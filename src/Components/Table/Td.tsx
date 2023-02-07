import { ReactChild } from "react"

export type Props = {
    children: ReactChild | ReactChild[],
    className?:string,
    colSpan?: number
}
export function Td(props:Props) {
    return <td colSpan={props.colSpan} className={"border border-darkGray px-4 py-2 break-all " + props.className}>{props.children}</td>
}