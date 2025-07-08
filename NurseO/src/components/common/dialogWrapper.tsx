import { Dialog } from "./ui/dialog"

type Props = {
    wrap: boolean
    children: React.ReactElement | React.ReactElement[]
}
export function DialogWrapper(props: Props) {

    if (props.wrap) {
        return <Dialog>{props.children}</Dialog>
    } else {
        return props.children
    }
}
