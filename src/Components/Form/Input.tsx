import { motion, Variants } from "framer-motion";
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

export type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id"> & {
    optional?: boolean,
    label: string,
    delay?: number,
    suffix?: string
}

function InputEle(props: Props, ref:ForwardedRef<HTMLInputElement>) {
    const id:string = new Date().getTime().toString();
    const animationVariants:Variants = { 
        hidden: { opacity: 0 },
        show: { 
            opacity: 1,
            transition:{delay: (props.delay || 0 )*0.4}
        },
        exit: { opacity: 0 },
    }


    const getInputProps = () =>{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { optional, label, delay, required, className, ...inputProps} = props
        return inputProps
    }

    return (
        <motion.div className="grid text-left my-4 relative w-full" initial="hidden" animate="show" exit="exit" variants={animationVariants}>
            <label htmlFor={id} className="font-normal">
                <span>{props.label}</span>
                <span className="opacity-75 text-sm"> {props.optional ? "(optional)" : null}</span>
            </label>
            <input id={id} {...getInputProps()} required={!props.optional} className={"border h-8  px-2"} ref={ref} />
            {props.suffix ? <div className="absolute top-7 left-78/100 tracking-wider opacity-75">| {props.suffix}</div>: null}
        </motion.div>
    )
}


export const Input = forwardRef(InputEle)