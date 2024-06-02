import { faPenToSquare, faSquareCaretDown, faSquareCaretUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion} from "framer-motion";
import { Medication, MedicationOrder, MedicationOrderSyntax } from "nurse-o-core";
import { useEffect, useState } from "react";
import { Database } from "../../Services/Database";

type Props = {
    medOrder: MedicationOrder,
    index: number,
    onDelete: ()=>void,
    onEdit: ()=>void,
    onIndexChangeHandler: (oldIndex:number, newIndex:number)=>void
}

export function MedicationOrdersPreviewer(props: Props) {
    const [med, setMed] = useState<Medication>({
        id: "", locations: [], narcoticCountNeeded: false
    })

    const [indexValue,setIndexValue] = useState(props.index+1)

    useEffect(()=>{
        const db = Database.getInstance();    
        db.getMedication(props.medOrder.id).then(m=>{
            if(m) setMed(m)
        })
    },[props.medOrder.id])

    const onUPorDownArrowsHandler = (direction: "up" | "down") => {
        let index = props.index
        if(direction === "up") index--
        if(direction === "down") index++
        props.onIndexChangeHandler(props.index, index)
    }

    const onIndexChangeHandler = ()=>{
        const oldIndex= props.index
        const newIndex = indexValue -1
        props.onIndexChangeHandler(oldIndex,newIndex)
        setIndexValue(props.index+1)
    }

    return (
        <motion.div className="bg-gray shadow-xl w-formWidth rounded-lg overflow-y-hidden py-5 mb-8 flex justify-evenly "
             initial={{scaleY:0 }} animate={{scaleY:1 }}>
            <div>
                <div className="text-center font-bold text-blue w-72">
                    <MedicationOrderSyntax med={med} order={props.medOrder} />
                </div>
                <div>Type: {props.medOrder.orderType}</div>
                <div className="mt-3">Mar: {props.medOrder.mar.length > 0 ? props.medOrder.mar.map((time) => time.hour.toString().padStart(2,"0") + ":" + time.minutes.toString().padStart(2,"0") + " ") : "No mar data added"}</div>
                <div className="text-blue font-bold mt-2">{props.medOrder.completed ? "Completed" : null}</div>
            </div>
            <div className="cursor-pointer grid items-center text-xl">
                <FontAwesomeIcon icon={faPenToSquare} onClick={props.onEdit} />
                <FontAwesomeIcon icon={faTrash}  onClick={props.onDelete} className="text-red"/>
            </div>
            <div className="grid text-xl items-center w-10 justify-items-center">
                <FontAwesomeIcon className="cursor-pointer" 
                onClick={()=>onUPorDownArrowsHandler("up")} icon={faSquareCaretUp} />

                <input type={"number"} className="w-full hideInputArrows border text-center"
                    value={indexValue} onBlur={onIndexChangeHandler} 
                    onChange={e=>setIndexValue(Number.parseInt(e.currentTarget.value))}
                />

                <FontAwesomeIcon className="cursor-pointer"
                 onClick={()=>onUPorDownArrowsHandler("down")} icon={faSquareCaretDown} />
            </div>
        </motion.div>
    )
}