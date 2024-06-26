import { motion } from "framer-motion";
import { countBy} from "lodash";
import { StudentReport } from "@nurse-o-core/index";
import { useEffect, useState } from "react";
import { STAGE_ANIMATION_DURATION } from "~/services/AnimationConfig";


type Props = {
    studentReports: StudentReport[],
}

export function ChartPreviewer(props: Props) {
    const [reports, setReports] = useState<{[key: string]: number}>({})

    useEffect(()=>{        
        const count = countBy(props.studentReports, "setName")
        setReports(count)
    },[props.studentReports])


    if(props.studentReports.length===0) return null

    return <motion.div 
        className={"bg-gray shadow-xl h-full pt-2 min-w-fit pb-8 px-6 rounded-lg overflow-y-auto text-left absolute right-20 top-10 break-words "}
        initial={{ x: 3000, y: 0 }} animate={{ x: 0, y: 0 }}
        transition={{ delay: STAGE_ANIMATION_DURATION }}
    >
    
    {Object.entries(reports).map((o,i)=>{
        return <div key={i} className="py-2">
            <span className="font-bold">{o[0]}</span> has <span className="font-bold text-blue">{o[1]}</span> entries
            <hr />
        </div>
        
    })}

    </motion.div>
}