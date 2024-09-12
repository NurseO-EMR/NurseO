import { faPenToSquare, faSquareCaretDown, faSquareCaretUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion} from "framer-motion";
import { type Medication, type MedicationOrder, MedicationOrderSyntax } from "~/core/index";
import { useMemo, useState } from "react";


type Props = {
    medOrder: MedicationOrder,
    index: number,
    medsList: Medication[],
    onDelete: ()=>void,
    onEdit: ()=>void,
    onIndexChangeHandler: (oldIndex:number, newIndex:number)=>void
}

export function MedicationOrdersPreviewer(props: Props) {


    const [indexValue,setIndexValue] = useState(props.index+1)
    const order = useMemo(()=>{
        const med = props.medsList.find(m=>m.id === props.medOrder.id)
        return {
            ...props.medOrder,
            brandName: med?.brandName,
            genericName: med?.genericName
        }
    }, [props.medOrder, props.medsList])

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
                    <MedicationOrderSyntax order={order} />
                </div>
                <div>Type: {order.orderType}</div>
                <div className="mt-3">Mar: {order.mar.length > 0 ? order.mar.map((time) => time.hour.toString().padStart(2,"0") + ":" + time.minute.toString().padStart(2,"0") + " ") : "No mar data added"}</div>
                <div className="text-blue font-bold mt-2">{order.completed ? "Completed" : null}</div>
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