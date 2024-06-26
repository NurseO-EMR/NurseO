import { faSquareCaretUp, faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomOrder } from "@nurse-o-core/index";
import { useState, FocusEvent } from "react";
import { Td } from "../../Table/Td";
import { Tr } from "../../Table/Tr";
import Parse from "html-react-parser"

type Props = {
    order: CustomOrder,
    onDelete: ()=>void,
    onIndexChange: (oldIndex:number, newIndex:number)=>void,
    index: number,
    onEdit: ()=>void,
}

export function CustomOrderPreviewerEntity(props:Props) {
    const [indexValue, setIndexValue] = useState(props.index)

    const onBlurClickHandler = (e:FocusEvent<HTMLInputElement, Element>) => {
        props.onIndexChange(indexValue, Number.parseInt(e.currentTarget.value)-1)
        setIndexValue(props.index)
    }

    return <Tr>
        <Td><pre>{props.order.orderType}</pre></Td>
        <Td><pre>{props.order.time}</pre></Td>
        <Td><pre className="whitespace-pre-wrap w-[33rem]">{Parse(props.order.order)}</pre></Td>
        <Td><button className="bg-blue min-w-full h-10 text-white font-bold px-3"
                onClick={props.onEdit}>Edit</button></Td>
        <Td className="px-0">
            <button className="bg-red min-w-full h-10 text-white font-bold"
                onClick={props.onDelete}>Delete</button>
        </Td>
        <Td>
            <div className="grid text-xl items-center w-10 justify-items-center">
                <FontAwesomeIcon className="cursor-pointer"
                    onClick={() => props.onIndexChange(indexValue, indexValue - 1)}
                    icon={faSquareCaretUp} />

                <input type={"number"} className="w-full hideInputArrows border text-center"
                    value={indexValue+1}
                    onChange={e=>setIndexValue(Number.parseInt(e.currentTarget.value)-1)}
                    onBlur={onBlurClickHandler}
                />

                <FontAwesomeIcon className="cursor-pointer"
                    onClick={() => props.onIndexChange(indexValue, indexValue + 1)}
                    icon={faSquareCaretDown}
                />
            </div>

        </Td>
    </Tr>
}