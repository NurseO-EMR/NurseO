import { motion } from "framer-motion";
import { useId } from "react";
import Select, { type MultiValue, type StylesConfig } from "react-select"


// many of the tsignore/eslint disable here are fine as array diract access is required for this to work.

type Props = {
    label: string,
    onChange: (values: string[]) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const id = useId()

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
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (option[k]) {
                    const temp: Option = {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        value: option[props.valueKey],
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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