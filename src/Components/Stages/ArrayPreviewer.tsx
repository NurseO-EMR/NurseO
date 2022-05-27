import { motion } from "framer-motion";
import { ReactChild } from "react";
import { STAGE_ANIMATION_DURATION } from "../../Services/AnimationConfig";
import { Tr } from "../Table/Tr";

type Props = {
    headerItems: string[],
    children: ReactChild[],
    show: boolean
}

export function ArrayPreviewer(props: Props) {
    if (props.show) {
        return (
            <motion.div className="bg-gray shadow-xl w-formWidth pt-2 pb-8 px-6 h-full rounded-lg overflow-y-hidden text-left"
                initial={{ x: 3000, y: -482 }} animate={{ x: 655, y: -482 }}
                transition={{ delay: STAGE_ANIMATION_DURATION }}
            >
                <h1 className="text-blue font-bold mt-4 mb-2">Added Allergies</h1>

                <table className="table-auto w-full border border-darkGray">
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