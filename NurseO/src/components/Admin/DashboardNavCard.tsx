import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children, type ReactChild } from "react";

type Props = {
    icon: IconProp,
    title: string,
    children: ReactChild | ReactChild[]
}

export function DashboardNavCard(props: Props) {
    return <div className="bg-gray shadow-xl mx-auto rounded-lg w-[20vw] py-5 px-4
             transition-all hover:scale-110
    ">
        <FontAwesomeIcon icon={props.icon} className="block m-auto text-3xl text-blue" />
        <h1 className="text-center font-bold mt-2">{props.title}</h1>
        {Children.map(props.children, (child, i) =>
            <div className="border-b my-4 hover:bg-blue hover:scale-105 transition-all" key={i}>
                <FontAwesomeIcon icon={faCaretRight} /> <span className="ml-2">{child}</span>
            </div>
        )}
    </div>
}