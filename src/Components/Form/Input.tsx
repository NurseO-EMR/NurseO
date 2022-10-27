
type Props = {
    className?: string,
    onChange?: (value: string) => void,
    autoFocus?: boolean,
    autoComplete?: string,
    disabled?: boolean,
    value?: string|number,
    type?: string,
};
export function Input(props: Props) {

    return (
        <input className={`border-2 rounded-full text-center col-span-3 h-9 border-primary px-2 ${props.className}`} 
            onChange={e => props.onChange ? props.onChange(e.currentTarget.value) : null} 
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            disabled={props.disabled}
            value={props.value}
            type={props.type}
        />
    );
}	
