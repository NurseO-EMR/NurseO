type Props = {
    children: string
}
export function Td(props:Props) {
    return <td className="border border-darkGray px-4 py-2">{props.children}</td>
}