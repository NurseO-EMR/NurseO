type Props = {
    children: string
}
export function Input(props: Props) {
    return (
        <div className="text-white grid m-2" >
            <label htmlFor="" className="mb-2 text-red-700 font-bold tracking-wider">{props.children}</label>
            <input type="text"  className="block h-10 rounded-sm border-red-700 border-2" />
        </div>
    )
}