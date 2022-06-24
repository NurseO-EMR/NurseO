import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import { Children, cloneElement, FormEvent, ForwardedRef, forwardRef, ReactElement } from "react";
import { STAGE_ANIMATION_DURATION } from "../../Services/AnimationConfig";


type Props = {
    children: ReactElement | ReactElement[],
    icon: IconProp,
    title: string,
    delay?: number,
    moveLeft?: boolean,
    onValid?: (valid: boolean)=>void,
    customIconNTitle?:boolean,
    onSubmit?: ()=>void

}



function FormEle(props: Props, ref: ForwardedRef<HTMLFormElement>) {

    const animationVariants: Variants = {
        init: {
            x:3000
        },
        end: {
            x:0
        },
        exit: {
            x:-3000
        },
        moveLeft: {
            x:-300
        }
    }


    const onSubmitHandler = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        if(props.onValid) props.onValid(e.currentTarget.checkValidity());
        if(props.onSubmit) props.onSubmit();
    }

    return (
            <motion.form className="bg-gray shadow-xl min-w-fit w-formWidth mx-auto h-fit mt-10 py-10 px-20 text-center rounded-lg"
                onSubmit={onSubmitHandler} variants={animationVariants}
                initial="init" animate={props.moveLeft ? "moveLeft" : "end"} exit="exit" transition={{ duration: STAGE_ANIMATION_DURATION, delay: props.delay }}
                ref={ref}
                >
                {!props.customIconNTitle ? 
                    <>
                        <FontAwesomeIcon icon={props.icon} className="text-5xl text-blue text-center" />

                        <h1 className="text-blue font-bold mt-4">{props.title}</h1>
                    </>
                : null}

                <motion.hr initial={{border: 1}} exit={{border: 0}} className="border-darkGray my-2" />

                {
                    Children.map(props.children, (child, i) =>
                        cloneElement(child, { delay: i + STAGE_ANIMATION_DURATION + (props.delay || 0) })
                    )
                }

            </motion.form>
    )
}


export const Form = forwardRef(FormEle);
