import { motion } from "framer-motion";
import { Report, StudentReport } from "nurse-o-core";
import { useEffect, useState } from "react";
import { STAGE_ANIMATION_DURATION } from "../../../Services/AnimationConfig";
import { Database } from "../../../Services/Database";
import { ReportDynamicTable } from "./ReportDynamicTable";


type Props = {
    show: boolean,
    className?: string,
    studentReports: StudentReport[]
}

export function ChartPreviewer(props: Props) {
    const [options, setOptions] = useState<Report[]>([])

    useEffect(()=>{
        const db = Database.getInstance()
        db.getSettings().then(s=>{
            const {reportSet} = s
            const sets = reportSet.filter(r => r.type === "studentVitalsReport" && r.name === "Initial Vitals")
            const options = sets[0].reportFields
            setOptions([...options])
        })
    }, [])


    return <motion.div className={"bg-gray shadow-xl h-full w-[70vw] pt-2 pb-8 px-6 rounded-lg overflow-y-auto text-left absolute right-20 top-10 break-words " + props.className}
        initial={{ x: 3000, y: 0 }} animate={{ x: 0, y: 0 }}
        transition={{ delay: STAGE_ANIMATION_DURATION }}
    >
        <h1 className="text-center text-2xl font-bold my-4">Vitals - Skin</h1>
        <ReportDynamicTable setName={"Vital"} options={options} onChange={console.log}/>

    </motion.div>
}