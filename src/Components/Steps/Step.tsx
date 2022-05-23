import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    icon: IconProp
    className?: string,
    active?: boolean
}

export function Step(props:Props) {
    return( 
    <div className={`p-0 bg-white rounded-full w-20 h-20 grid justify-center items-center 
    transition-all duration-200 ${props.className}`} 
    style={props.active ? {background: "#F63B3B"}: undefined}>
                <FontAwesomeIcon className="text-4xl text-blue transition-all duration-200 hover:animate-bounce"
                style={props.active ? {color: "#ffffff"}: undefined}
                icon={props.icon}></FontAwesomeIcon>
            </div>
    )
}