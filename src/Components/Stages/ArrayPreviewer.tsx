import { motion } from "framer-motion";
import { ReactChild } from "react";
import { STAGE_ANIMATION_DURATION } from "../../Services/AnimationConfig";
import { Tr } from "../Table/Tr";

type Props = {
    headerItems: string[],
    children: ReactChild[],
    show: boolean,
    title: string,
    className?:string
}

export function ArrayPreviewer(props: Props) {
    if (props.show) {
        return (
            <motion.div className={"bg-gray shadow-xl h-full w-formWidth pt-2 pb-8 px-6 rounded-lg overflow-auto text-left absolute right-20 top-10 break-words " + props.className }
                initial={{ x: 3000, y: 0 }} animate={{ x: 0, y: 0 }}
                transition={{ delay: STAGE_ANIMATION_DURATION }}
            >
                <h1 className="text-blue font-bold mt-4 mb-2">{props.title}</h1>

                <table className="table-auto border border-darkGray">
                    <thead>
                        <Tr>
                            {props.headerItems.map((header, i) => <th key={i} className="border border-darkGray px-4 py-2">{header}</th>)}
                        </Tr>
                    </thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </table>
            </motion.div>
        )
    }

    else return null
}