import { ReactChild } from "react"

type Props = {
    className?: string,
    children: ReactChild | ReactChild[]
}
export function Card(props:Props) {
    return <div className={`bg-gray shadow-xl mx-auto rounded-lg mt-[10vh] h-[80vh] w-[60vw] py-5 px-4 ${props.className}`}>{props.children}</div>
}