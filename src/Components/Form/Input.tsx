import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import { ChangeEvent, DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useState } from "react";
import {v4 as uuid} from "uuid"
import { Announcement, broadcastAnnouncement } from "../../Services/AnnouncementService";

export type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "id"> & {
    optional?: boolean,
    label: string,
    delay?: number,
    suffix?: string[],
    hideLabel?: boolean,
    inputClassName?: string,
    onChangeWSuffix?: (value:string)=>void
}

function InputEle(props: Props, ref:ForwardedRef<HTMLInputElement>) {
    const [id] = useState(uuid())
    const [suffixIndex, setSuffixIndex] = useState(0)
    const [value, setValue]= useState(props.value)
    const animationVariants:Variants = { 
        hidden: { opacity: 0 },
        show: { 
            opacity: 1,
            transition:{delay: (props.delay || 0 )*0.4}
        },
        exit: { opacity: 0 },
    }


    useEffect(()=>{
        if(props.suffix && props.suffix.length > 0 && props.value) {
            const value = props.value.toString()
            let numberValue = "";
            let suffixValue = "";
            for(const char of value) {
                if(char === "." || !isNaN(parseInt(char))) numberValue += char
                else suffixValue+="";
            }

            const index = props.suffix.indexOf(suffixValue)
            if(index > -1) setSuffixIndex(index)
            setValue(numberValue)

        }
    }, [props.suffix, props.value])

    const getInputProps = () =>{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { optional, label, delay, required, className, hideLabel, onChange, onChangeWSuffix, value, ...inputProps} = props
        return inputProps
    }

    const onSuffixSwitchHandler = ()=>{
        if(!props.suffix) {
            broadcastAnnouncement("There is no suffix to switch to", Announcement.error)
            return;
        }

        let index = suffixIndex
        if(suffixIndex === props.suffix.length - 1) index = 0
        else index++;

        setSuffixIndex(index)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        if(props.suffix && props.suffix.length > 0) {
            const value = e.currentTarget.value + props.suffix[suffixIndex]
            if(props.onChangeWSuffix) props.onChangeWSuffix(value)
        } else if(props.onChange) props.onChange(e)
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
                onChange={onChangeHandler}
                value={value}
            />

            {props.suffix ? <div className="absolute top-7 left-78/100 tracking-wider opacity-75"> | 
                {props.suffix.length > 1 ? <> {props.suffix[suffixIndex]} <FontAwesomeIcon className="cursor-pointer" onClick={onSuffixSwitchHandler}  icon={faArrowsRotate} /></> 
                    : <>{props.suffix[suffixIndex]}</> }
            </div>: null}
        </motion.div>
    )
}


export const Input = forwardRef(InputEle)

