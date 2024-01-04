type Props = {
    children: string,
    className?:string,
    onClick?: ()=>void
}
export function Button(props:Props) {
    return (
        <button className={"font-bold text-white w-full py-4 " + props.className} onClick={props.onClick}>{props.children}</button>
    )
}