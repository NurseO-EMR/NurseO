
type Props = {
    className?: string,
    onChange: (value: string) => void,
    autoFocus: boolean,
    autoComplete: string
};
export function Input(props: Props) {

    return (
        <input className={`border-2 rounded-full text-center col-span-3 h-9 border-primary ${props.className}`} 
            onChange={e => props.onChange(e.currentTarget.value)} 
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
        />
    );
}	
