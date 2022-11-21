import { ReactChild } from "react"

type Props = {
    children: ReactChild | ReactChild[],
    className?:string
}
export function Td(props:Props) {
    return <td className={"border border-darkGray px-4 py-2 break-all " + props.className}>{props.children}</td>
}