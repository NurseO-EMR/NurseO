import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Props = {
    icon: IconProp
    className?: string,
    active?: boolean,
}

export function Step(props:Props) {
    return( 
    <div className={`p-0 bg-white rounded-full w-20 h-20 grid justify-center 
    items-center text-blue text-4xl cursor-pointer
    transition-all duration-100 ease-in-out hover:bg-red hover:text-white 
    ${props.className}`} 
    style={props.active ? {background: "#F63B3B"}: undefined}
    >
                <FontAwesomeIcon style={props.active ? {color: "#ffffff"}: undefined}
                icon={props.icon}></FontAwesomeIcon>
            </div>
    )
}