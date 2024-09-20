import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { type CustomOrder, OrderKind, OrderType, type PatientChart } from "~/core/index";
import { useState } from "react";
import { Button } from "~/components/Admin/Form/Button";
import { Input } from "~/components/Admin/Form/Input";
import { RichTextArea } from "~/components/common/RichTextArea";
import { Select } from "~/components/Admin/Form/Select";
import { type BaseStageProps, BaseStage } from "~/components/Admin/Stages/BaseStage"
import { CustomOrderPreviewer } from "~/components/Admin/Stages/CustomOrders/CustomOrderPreviewer";
import { broadcastAnnouncement, Announcement } from "~/services/AnnouncementService";



export type Props = BaseStageProps & {
    onNext: (orders: CustomOrder[]) => void,
    patient?: PatientChart
}

export function CustomOrdersStage(props: Props) {
    const [orders, setOrders] = useState(props.patient?.customOrders ?? [] as CustomOrder[]);

    const [order, setOrder] = useState("");
    const [orderType, setOrderType] = useState(OrderType.NA);
    const [time, setTime] = useState("")


    const onCustomOrderAddHandler = () => {
        orders.push({
            order,
            orderType,
            orderKind: OrderKind.custom,
            time,
            orderIndex: orders.length,
        })
        setOrders([...orders]);
        setOrder("");
    }

    const onIndexChangeHandler = (oldIndex: number, newIndex: number) => {
        if (newIndex < 0 || newIndex > orders.length - 1) {
            broadcastAnnouncement("can't move this item", Announcement.error);
            return;
        }

        const temp = orders[oldIndex]!
        orders.splice(oldIndex, 1)
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

    const onEditClickHandler = (index: number) => {
        const tempOrder = orders[index]!
        setTime(tempOrder.time ?? "")
        setOrder(tempOrder.order)
        setOrderType(tempOrder.orderType)
        onDeleteClickHandler(index)
    }

    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Custom Orders" icon={faStethoscope} moveLeft={orders.length > 0}>
                <Input label="Time" value={time} optional
                    onChange={e => setTime(e.currentTarget.value)} />

                <label className="block text-left">Entry: </label>
                <RichTextArea onChange={e => setOrder(e)} value={order}
                    className="h-40 bg-white border" />


                <Select label="Order Type" value={orderType}
                    onChange={e => setOrderType(e.currentTarget.value as OrderType)} optional>
                    {Object.values(OrderType).map((t, i) => <option value={t} key={i}>{t}</option>)}
                </Select>

                <Button onClick={onCustomOrderAddHandler}
                    className="bg-blue my-4">Add Custom Order Entry</Button>
            </BaseStage>

            <CustomOrderPreviewer orders={orders}
                onDeleteClickHandler={onDeleteClickHandler}
                onIndexChangeHandler={onIndexChangeHandler}
                onEdit={onEditClickHandler}
            />


        </div>
    )

}