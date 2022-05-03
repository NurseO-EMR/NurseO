type Props = {
    children: string
}
export function Input(props: Props) {
    return (
        <div className="text-white grid m-2" >
            <label htmlFor="" className="mb-2 text-red-400 font-bold tracking-wider">{props.children}</label>
            <input type="text"  className="block h-10 rounded-sm " />
        </div>
    )
}