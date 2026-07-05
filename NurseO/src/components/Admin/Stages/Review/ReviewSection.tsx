import { ReactChild } from "react"

type Props = {
    title: string,
    children: ReactChild[] | ReactChild
}
export function ReviewSection(props: Props) {
    return <section className="text-left">
        <h2 className="font-bold text-blue text mb-3">{props.title}</h2>
        <>
        {props.children}
        <hr className="border-red border my-3"/>
        </>
    </section>
}