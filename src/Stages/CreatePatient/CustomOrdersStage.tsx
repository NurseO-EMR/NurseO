import { faMaskVentilator } from "@fortawesome/free-solid-svg-icons";
import { CustomOrder, OrderKind, OrderType, PatientChart } from "nurse-o-core";
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { CustomOrderPreviewer } from "../../Components/Stages/CustomOrders/CustomOrderPreviewer";
import { broadcastAnnouncement, Announcement } from "../../Services/AnnouncementService";

export type Props = BaseStageProps & {
    onNext: (orders: CustomOrder[]) => void,
    patient?: PatientChart
}

export function CustomOrdersStage(props: Props) {
    const [orders, setOrders] = useState(props.patient?.customOrders || [] as CustomOrder[]);

    const [order, setOrder] = useState("");
    const [orderType, setOrderType] = useState(OrderType.NA);
    const [time, setTime] = useState("")


    const onCustomOrderAddHandler = () => {
        orders.push({
            order,
            orderType,
            orderKind: OrderKind.custom,
            time,
        })
        setOrders([...orders]);
        setOrder("");
    }

    const onIndexChangeHandler = (oldIndex:number, newIndex: number) => {
        if (newIndex < 0 || newIndex > orders.length - 1) {
            broadcastAnnouncement("can't move this item", Announcement.error); 
            return; 
        }

        const temp = orders[oldIndex]
        orders.splice(oldIndex,1)
        orders.splice(newIndex, 0, temp)

        setOrders([...orders]);
        broadcastAnnouncement("Order Moved", Announcement.success)
    }


    const onNextClickHandler = () => {
        props.onNext(orders)
    }

    const onDeleteClickHandler = (index: number) => {
        orders.splice(index, 1)
        setOrders([...orders]);
    }

    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Custom Orders" icon={faMaskVentilator} moveLeft={orders.length > 0}>
                <Input label="Time" value={time} optional
                    onChange={e => setTime(e.currentTarget.value)} />

                <label className="block text-left">Entry: </label>
                <textarea className="border p-2" cols={45} rows={5} value={order}
                    onChange={e => setOrder(e.currentTarget.value)} />

                <Select label="Order Type" value={orderType}
                    onChange={e => setOrderType(e.currentTarget.value as OrderType)} optional>
                    {Object.values(OrderType).map((t, i) => <option value={t} key={i}>{t}</option>)}
                </Select>

                <Button onClick={onCustomOrderAddHandler}
                    className="bg-blue my-4">Add Custom Order Entry</Button>
            </BaseStage>

            <CustomOrderPreviewer orders={orders}
             onDeleteClickHandler={onDeleteClickHandler} 
             onIndexChangeHandler={onIndexChangeHandler}/>


        </div>
    )

}