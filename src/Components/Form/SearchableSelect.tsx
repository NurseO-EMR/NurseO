import { motion, Variants } from "framer-motion";
import { filter } from "lodash";
import Select, { StylesConfig } from "react-select"
import Creatable from "react-select/creatable"

export type Props = {
    optional?: boolean,
    label: string,
    delay?: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
    labelKey: string,
    valueKey: string,
    onChange: (value: string) => void,
    value?: string,
    creatable?: boolean,
    onCreateOption?: (value: string) => void
}

type Option = {
    value: string,
    label: string
}

export function SearchableSelect(props: Props) {
    const id: string = new Date().getTime().toString();

    const customStyles: StylesConfig = {
        control: () => ({
            alignItems: "center",
            borderWidth: "1px",
            display: "flex",
            background: "#ffffff",
            flexWrap: "wrap",
            justifyContent: "space-between",
        }),
    }




    const animationVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { delay: (props.delay || 0) * 0.4 }
        },
        exit: { opacity: 0 },
    }


    const getOptions = () => {
        const output = [];
        for (const option of props.options) {
            const temp: Option = {
                value: option[props.valueKey],
                label: option[props.labelKey]
            }
            output.push(temp);
        }
        return output;
    }

    const getValue = () => {
        if (!props.value) return null
        const options = getOptions();
        const value = filter(options, { value: props.value })
        return value;
    }



    return (
        <motion.div className="grid text-left my-4 relative w-full" initial="hidden" animate="show" exit="exit" variants={animationVariants} >
            <label htmlFor={id} className="font-normal">
                <span>{props.label}</span>
                <span className="opacity-75 text-sm"> {props.optional ? "(optional)" : null}</span>
            </label>

            {props.creatable ?
                <Creatable options={getOptions()} value={getValue()} onCreateOption={props.onCreateOption}
                    onChange={(e) => props.onChange((e as Option | undefined)?.value || "")}
                    isClearable={true}
                    styles={customStyles}
                />

                :

                <Select options={getOptions()} value={getValue()}
                    onChange={(e) => props.onChange((e as Option | undefined)?.value || "")}
                    isClearable={true}
                    styles={customStyles}
                />
            }
        </motion.div>
    )




    // return (
    //     <motion.div className="grid text-left my-4 relative w-full" initial="hidden" animate="show" exit="exit" variants={animationVariants} >
    //         <label htmlFor={id} className="font-normal">
    //             <span>{props.label}</span>
    //             <span className="opacity-75 text-sm"> {props.optional ? "(optional)" : null}</span>
    //         </label>
    //         <Select options={getOptions()} value={getValue()} 
    //             onChange={(e)=>props.onChange((e as Option|undefined)?.value || "")}
    //             isClearable={true} 
    //             styles={customStyles} 
    //         />
    //     </motion.div>
    // )
}