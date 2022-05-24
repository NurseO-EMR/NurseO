type Props = {
    label: string,
    className?: string,
    type?: string,
    placeHolder?: string,
    value?: string,
    size?: number,
    maxLength?: number
    pattern?: string,
    optional?: boolean,
    autoFocus?: boolean,
    autoComplete?: "on" | "off",
}
export function Input(props: Props) {
    const id:string = new Date().getTime().toString();
    return (
        <div className="grid text-left my-4">
            <label htmlFor={id} className="font-normal">{props.label}</label>
            <input id={id} {...props} required={!props.optional} className={"border h-8"} />
        </div>
    )
}