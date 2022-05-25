import { motion, Variants } from "framer-motion";

export type Props = {
    label: string,
    className?: string,
    type?: string,
    placeHolder?: string,
    value?: string,
    size?: number,
    maxLength?: number
    pattern?: string,
    optional?: boolean,
    autoFocus?: boolean,
    autoComplete?: "on" | "off",
    delay?: number
}
export function Input(props: Props) {
    const id:string = new Date().getTime().toString();
    const animationVariants:Variants = { 
        hidden: { opacity: 0 },
        show: { 
            opacity: 1,
            transition:{delay: (props.delay || 0 )*0.4}
        },
        exit: { opacity: 0 },
    }

    return (
        <motion.div className="grid text-left my-4" initial="hidden" animate="show" exit="exit" variants={animationVariants}>
            <label htmlFor={id} className="font-normal">{props.label}</label>
            <input id={id} {...props} required={!props.optional} className={"border h-8  px-2"} />
        </motion.div>
    )
}