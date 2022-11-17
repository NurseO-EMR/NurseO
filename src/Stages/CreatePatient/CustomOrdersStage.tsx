import { faMaskVentilator, faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomOrder, OrderKind, OrderType, PatientChart } from "nurse-o-core";
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { ArrayPreviewer } from "../../Components/Stages/ArrayPreviewer";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { makeTimeObject, convertTimeToString } from "../../Services/Util";

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
            time: makeTimeObject(time)
        })
        setOrders([...orders]);
        setOrder("");
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
                <Input label="Time" type={"time"} value={time}
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



            <ArrayPreviewer headerItems={["Type", "Time", "Order", "Delete", ""]} show={orders.length > 0} title="Added Custom Orders"
                className="hover:w-[60rem] transition-all">
                {orders.map((entry, i) =>
                    <Tr key={i}>
                        <Td><pre>{entry.orderType}</pre></Td>
                        <Td><pre>{entry.time ? convertTimeToString(entry.time) : null}</pre></Td>
                        <Td><pre className="whitespace-pre-wrap w-[33rem]">{entry.order}</pre></Td>
                        <Td className="px-0">
                            <button className="bg-red min-w-full h-10 text-white font-bold"
                                onClick={() => onDeleteClickHandler(i)}>Delete</button>
                        </Td>
                        <Td>
                            <div className="grid text-xl items-center w-10 justify-items-center">
                                <FontAwesomeIcon className="cursor-pointer"
                                    onClick={console.log} icon={faSquareCaretUp} />

                                <input type={"number"} className="w-full hideInputArrows border text-center"
                                    value={i} onBlur={console.log}
                                    onChange={console.log}
                                />

                                <FontAwesomeIcon className="cursor-pointer"
                                    onClick={console.log} icon={faSquareCaretDown} />
                            </div>

                        </Td>
                    </Tr>
                )}
            </ArrayPreviewer>

        </div>
    )

}