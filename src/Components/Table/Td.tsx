import { ReactChild } from "react"

type Props = {
    children: ReactChild
}
export function Td(props:Props) {
    return <td className="border border-darkGray px-4 py-2 break-all">{props.children}</td>
}