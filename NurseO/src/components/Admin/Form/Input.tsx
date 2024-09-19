import { motion, type Variants } from "framer-motion";
import { type DetailedHTMLProps, type ForwardedRef, forwardRef, type InputHTMLAttributes, useId } from "react";

export type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id"> & {
    optional?: boolean,
    label: string,
    delay?: number,
    hideLabel?: boolean,
    inputClassName?: string,
}

function InputEle(props: Props, ref:ForwardedRef<HTMLInputElement>) {
    const id = useId()
    const animationVariants:Variants = { 
        hidden: { opacity: 0 },
        show: { 
            opacity: 1,
            transition:{delay: (props.delay ?? 0 )*0.4}
        },
        exit: { opacity: 0 },
    }


    const getInputProps = () =>{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { optional, label, delay, required, className, hideLabel, onChange, value, ...inputProps} = props
        return inputProps
    }


    return (
        <motion.div className={`grid text-left my-4 relative w-full ${props.className}`} 
        initial="hidden" animate="show" exit="exit" variants={animationVariants}>
            <label htmlFor={id} className="font-normal" hidden={props.hideLabel}>
                <span>{props.label}</span>
                <span className="opacity-75 text-sm"> {props.optional ? "(optional)" : null}</span>
            </label>
            <input id={id} {...getInputProps()} 
                required={!props.optional} 
                className={`border h-8  px-2 w-full ${props.inputClassName}`} ref={ref} 
                onChange={props.onChange}
                value={props.value}
            />

        </motion.div>
    )
}


export const Input = forwardRef(InputEle)

