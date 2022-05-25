import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import { Children, cloneElement, FormEvent, ReactElement } from "react";


type Props = {
    children: ReactElement | ReactElement[],
    animationDuration: number,
    icon: IconProp,
    title: string,
    delay?: number
}



export function Form(props: Props) {

    const animationVariants: Variants = {
        init: {
            x:3000
        },
        end: {
            x:0
        },
        exit: {
            x:-3000
        }
    }


    const onSubmitHandler = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        e.stopPropagation();
    }

    return (
            <motion.form className="bg-gray shadow-xl w-formWidth mx-auto h-fit mt-10 py-10 px-20 text-center rounded-lg overflow-y-hidden"
                onSubmit={onSubmitHandler} variants={animationVariants}
                initial="init" animate="end" exit="exit" transition={{ duration: props.animationDuration, delay: props.delay }}>

                <FontAwesomeIcon icon={props.icon} className="text-5xl text-blue text-center" />

                <h1 className="text-blue font-bold mt-4">{props.title}</h1>

                <motion.hr initial={{border: 1}} exit={{border: 0}} className="border-darkGray my-2" />

                {
                    Children.map(props.children, (child, i) =>
                        cloneElement(child, { delay: i + props.animationDuration + (props.delay || 0) })
                    )
                }

            </motion.form>
    )
}