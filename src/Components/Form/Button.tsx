type Props = {
    children: string,
}
export function Button(props:Props) {
    return (
        <button className="py-2 font-bold text-white px-10 bg-blue-700 rounded-full">{props.children}</button>
    )
}