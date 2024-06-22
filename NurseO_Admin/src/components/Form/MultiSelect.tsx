import { motion } from "framer-motion";
import { v4 } from "uuid";
import Select, { MultiValue, StylesConfig } from "react-select"

type Props = {
    label: string,
    onChange: (values: string[]) => void,
    options: any[],
    labelKeys: string[],
    valueKey: string,
    value?: string,
}

type Option = {
    value: string,
    label: string
}

export function MultiSelect(props: Props) {
    const id= v4()

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

    const getOptions = () => {
        const output: Option[] = [];
        for (const option of props.options) {
            // if(!option[props.labelKey]) continue;
            props.labelKeys.map(k => {
                if (option[k]) {
                    const temp: Option = {
                        value: option[props.valueKey],
                        label: option[k]
                    }

                    output.push(temp);
                }
            })


        }
        return output;
    }

    const onChangeHandler = (values: MultiValue<unknown>)=>{
        const options = values as Option[]
        const output = []
        for(const option of options) output.push(option.value)
        props.onChange(output)
    }

    return (
        <motion.div className="grid text-left my-4 relative w-full" >
            <label htmlFor={id} className={`font-normal`}>
                <span>{props.label}</span>
            </label>


            <Select options={getOptions()}
                isMulti
                onChange={onChangeHandler}
                isClearable={true}
                styles={customStyles}
            />

        </motion.div>
    )
}