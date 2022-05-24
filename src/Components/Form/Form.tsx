import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import { Children, cloneElement, FormEvent, ReactElement } from "react";


type Props = {
    children: ReactElement[],
    animationDuration: number,
    icon: IconProp,
    title: string,
}



export function Form(props: Props) {

    const animationVariants: Variants = {
        init: {
            maxHeight: "0px",
            padding: "0rem 2.5rem"
        },
        end: {
            maxHeight: "1000px",
            padding: "2.5rem 2.5rem"
        },
        exit: {
            maxHeight: "0px",
            padding: "0rem 2.5rem"
        }
    }


    const onSubmitHandler = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <motion.form className="bg-gray shadow-xl w-formWidth mx-auto h-fit mt-10 py-10 px-20 text-center rounded-lg"
            onSubmit={onSubmitHandler} variants={animationVariants}
            initial="init" animate="end" exit="exit" transition={{ duration: props.animationDuration }}>
            <FontAwesomeIcon icon={props.icon} className="text-5xl text-blue text-center" />
            <h1 className="text-blue font-bold mt-4">{props.title}</h1>
            <hr className="border-darkGray my-2" />

            {
                Children.map(props.children, (child, i) =>
                    cloneElement(child, { delay: i + props.animationDuration })
                )
            }

        </motion.form>
    )
}