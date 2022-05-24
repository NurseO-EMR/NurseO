import { motion, Variants } from "framer-motion";

type Props = {
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
    delay: number
}
export function Input(props: Props) {
    const id:string = new Date().getTime().toString();
    const animationVariants:Variants = { 
        hidden: { opacity: 0 },
        show: { opacity: 1 } 
    }

    return (
        <motion.div className="grid text-left my-4" initial="hidden" animate="show" variants={animationVariants} transition={{delay: props.delay*0.5}}>
            <label htmlFor={id} className="font-normal">{props.label}</label>
            <input id={id} {...props} required={!props.optional} className={"border h-8"} />
        </motion.div>
    )
}