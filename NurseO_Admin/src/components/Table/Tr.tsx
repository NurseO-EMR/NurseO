import { ReactNode } from "react";
type Props = {
    children: ReactNode | ReactNode[],
    className?: string
}

export function Tr(props:Props) {
    return <tr className={`border border-darkGray ${props.className}`}>
        {props.children}
    </tr>
}