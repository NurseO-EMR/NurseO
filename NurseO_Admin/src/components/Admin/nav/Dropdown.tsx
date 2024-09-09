import { Children, type ReactChild } from "react"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
    label: string,
    children: ReactChild[]
}
export function Dropdown(props:Props) {
    return (
        <div className="relative group">
            <button>
                <span>{props.label} <FontAwesomeIcon icon={faCaretDown} /> </span>
            </button>
            <div className="hidden absolute z-20 group-hover:block">
                    <div className="grid bg-white shadow-xl min-w-max mt-5">
                        {Children.map(props.children,(child)=><div role="button" className="py-4 px-2 hover:bg-gray">{child}</div>)}
                    </div>
            </div>
        </div>
    )
}