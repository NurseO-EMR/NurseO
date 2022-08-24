import { faMaskVentilator } from "@fortawesome/free-solid-svg-icons";
import { CustomOrder, OrderKind, OrderType, PatientChart } from "nurse-o-core";
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { Select } from "../../Components/Form/Select";
import { ArrayPreviewer } from "../../Components/Stages/ArrayPreviewer";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (orders: CustomOrder[]) => void,
    patient?:PatientChart
}

export function CustomOrdersStage(props: Props) {
    const [orders, setOrders] = useState(props.patient?.customOrders || []as CustomOrder[]);
    
    const [order, setOrder] = useState("");
    const [orderType, setOrderType] = useState(OrderType.NA);



    const onHistoryAddClickHandler = () => {
        orders.push({
            order,
            orderType,
            orderKind: OrderKind.custom,
        })
        setOrders([...orders]);
        setOrder("");
    }


    const onNextClickHandler = ()=> {
        props.onNext(orders)
    }

    const onDeleteClickHandler = (index:number)=>{
        orders.splice(index,1)
        setOrders([...orders]);
    }

    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Custom Orders" icon={faMaskVentilator} moveLeft={orders.length > 0}>
                <label className="block text-left">Entry: </label>
                <textarea className="border p-2" cols={45} rows={5} onChange={e=>setOrder(e.currentTarget.value)} />
                <Select label="Order Type" value={orderType} onChange={e => setOrderType(e.currentTarget.value as OrderType)} optional>
                        {Object.values(OrderType).map((t, i) => <option value={t} key={i}>{t}</option>)}
                    </Select>
                
                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Custom Order Entry</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["type","Order", "Delete"]} show={orders.length > 0} title="Added Custom Orders">
                {orders.map((entry,i)=>
                    <Tr key={i}>
                        <Td><pre>{entry.orderType}</pre></Td>
                        <Td><pre>{entry.order}</pre></Td>
                        <Td>
                            <button className="bg-red w-full h-10 text-white font-bold"
                            onClick={()=>onDeleteClickHandler(i)}>Delete</button>
                        </Td>
                    </Tr>
                )}
            </ArrayPreviewer>

        </div>
    )

}