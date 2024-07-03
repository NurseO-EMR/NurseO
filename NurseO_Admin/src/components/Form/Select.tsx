import { motion, type Variants } from "framer-motion";
import { type DetailedHTMLProps, type ForwardedRef, forwardRef, type ReactChild, type SelectHTMLAttributes } from "react";

export type Props = Omit<DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "id"> & {
    optional?: boolean,
    label: string,
    delay?: number,
    suffix?: string,
    children: ReactChild[]
}

function SelectEle(props: Props, ref:ForwardedRef<HTMLSelectElement>) {
    const id:string = new Date().getTime().toString();
    const animationVariants:Variants = { 
        hidden: { opacity: 0 },
        show: { 
            opacity: 1,
            transition:{delay: (props.delay ?? 0 )*0.4}
        },
        exit: { opacity: 0 },
    }


    const getSelectProps = () =>{
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
            <select id={id} {...getSelectProps()} required={!props.optional} className={"border h-8  px-2 disabled:bg-disabled"} ref={ref}>
                {props.children}
            </select>
        </motion.div>
    )
}


export const Select = forwardRef(SelectEle)