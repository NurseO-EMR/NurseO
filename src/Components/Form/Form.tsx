import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactChild } from "react";


type Props = {
    children: ReactChild | ReactChild[]
}


export function Form(props:Props) {
    return (
        <form className="bg-gray shadow-xl w-formWidth mx-auto h-fit mt-10 py-10 px-20 text-center rounded-lg" onSubmit={e=>e.preventDefault()}>
            <FontAwesomeIcon icon={faIdCard} className="text-5xl text-blue text-center" />
            <h1 className="text-blue font-bold mt-4">Let{"`"}s collect some basic information about your patient</h1>
            <hr className="border-darkGray my-2"/>
            {props.children}
            
        </form>
    )
}