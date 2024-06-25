import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button } from "~/components/Form/Button";
import { Input } from "~/components/Form/Input";
import { Select } from "~/components/Form/Select";
import { type BaseStageProps, BaseStage } from "~/components/Stages/BaseStage"
import { type MedicationOrder, OrderKind, OrderType, Frequency, Routine, type PatientChart, type MarRecord, type Medication } from "@nurse-o-core/index"
import { MedicationOrdersPreviewer } from "~/components/Stages/MedicationOrdersPreviewer";
import { AnimatePresence } from "framer-motion";
import { SearchableSelect } from "~/components/Form/SearchableSelect";
import { broadcastAnnouncement, Announcement } from "~/services/AnnouncementService";
import { MarRecordEditor } from "~/components/Stages/MarRecordEditor";
import { api } from "~/utils/api";

export type Props = BaseStageProps & {
    onNext: (orders: MedicationOrder[]) => void,
    patient?: PatientChart
}

export function OrdersStage(props: Props) {
    const {data: meds} = api.medication.getAllMeds.useQuery()

    const [id, setId] = useState(-1);
    const [concentration, setConcentration] = useState("");
    const [route, setRoute] = useState("");
    const [routine, setRoutine] = useState(Routine.NA);
    const [PRNNote, setPRNNote] = useState("");
    const [frequency, setFrequency] = useState(Frequency.NA);
    const [mar, setMar] = useState<MarRecord[]>([]);
    const [notes, setNotes] = useState("");
    const [orderType, setOrderType] = useState(OrderType.NA);
    const [completed, setCompleted] = useState(false);
    const [showMar, setShowMar] = useState(false);
    const [time, setTime] = useState("");

    const [orders, setOrders] = useState(props.patient?.medicationOrders ?? [] as MedicationOrder[]);



    const onOrderAddClickHandler = () => {

        //check if there is med 
        if (!id) { broadcastAnnouncement("No med selected", Announcement.error); return; }
        if (orderType === OrderType.NA) {broadcastAnnouncement("must select order type", Announcement.error); return; }

        const order: MedicationOrder = {
            id: id,
            concentration,
            route,
            routine,
            frequency,
            mar,
            notes,
            orderType,
            PRNNote,
            orderKind: OrderKind.med,
            completed,
            time,
            orderId: -1
        }

        orders.push(order)
        setOrders([...orders]);
        console.log(orders)

        setId(-1)
        setConcentration("")
        setRoute("")
        setRoutine(Routine.NA)
        setPRNNote("")
        setFrequency(Frequency.NA)
        setMar(new Array<MarRecord>())
        setNotes("")
        setOrderType(OrderType.NA)
        setCompleted(false)
    }


    const onNextClickHandler = () => {
        props.onNext(orders)
    }

    const onIndexChangeHandler = (oldIndex:number, newIndex: number) => {
        if (newIndex < 0 || newIndex > orders.length - 1) {
            broadcastAnnouncement("can't move this item", Announcement.error); 
            return; 
        }

        const temp = orders[oldIndex]!
        orders.splice(oldIndex,1)
        orders.splice(newIndex, 0, temp)

        setOrders([...orders]);
        broadcastAnnouncement("Order Moved", Announcement.success)
    }

    const onDeleteHandler = (index: number) => {
        const temp = orders;
        temp.splice(index, 1);
        setOrders([...temp])
    }

    const onEditClickHandler = (index: number) => {
        // TODO: look at this mess
        // // frequency
        // const order = orders[index]!;
        // // const indexableFrequency:{[key: string]:string} = Frequency
        // const indexableFrequency:Record<string, string> = Frequency
        // const values = Object.values(Frequency)
        // const keys = Object.keys(Frequency)
        // const frequencyKeyIndex = values.indexOf(order.frequency)
        // // const frequencyKey = indexableFrequency[keys[frequencyKeyIndex]]
        // // TODO: look at this mess
        // //mar
        // let marString = ""
        // for(const time of order.mar) {
        //     const temp = `${time.hour.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`
        //     if(marString !== "") marString +=","
        //     marString += temp
        // }

        
        // setId(order.id)
        // setConcentration(order.concentration)
        // setRoute(order.route)
        // setRoutine(order.routine)
        // setPRNNote(order.PRNNote || "")
        // setFrequency(frequencyKey as Frequency)
        // setMar(order.mar)
        // setNotes(order.notes)
        // setOrderType(order.orderType)
        // setCompleted(order.completed || false)
    }


    return (
        <div className="relative w-screen">
            <BaseStage {...props} onNext={onNextClickHandler} title="Medication Orders" icon={faBookMedical} moveLeft={orders.length > 0}>
                <div className="grid grid-cols-3 gap-x-8 max-w-[50vw]">
                    <SearchableSelect label="Medication Name (generic)" options={meds ?? []} labelKeys={["genericName", "brandName"]} valueKey="id" value={id.toString()} onChange={v=>setId(parseInt(v))} />

                    <Input label="Prescribed Dose" onChange={e => setConcentration(e.currentTarget.value)} value={concentration} optional placeholder="ex: 20mg/kg" />
                    <Input label="Route" onChange={e => setRoute(e.currentTarget.value)} value={route} optional />

                    <Select label="Routine" onChange={e => setRoutine(e.currentTarget.value as Routine)} value={routine} optional>
                        {Object.values(Routine).map((r, i) => <option value={r} key={i}>{r}</option>)}
                    </Select>

                    {routine === Routine.PRN ? <Input label="PRN Note" onChange={e => setPRNNote(e.currentTarget.value)} value={PRNNote} optional /> : null}

                    <Select label="Frequency" onChange={e => setFrequency(e.currentTarget.value as Frequency)} value={frequency} optional>
                        {Object.values(Frequency).map((f, i) => <option value={f} key={i}>{f}</option>)}
                    </Select>

                    <div className="grid items-center"><Button className="bg-red h-10 mt-4 py-0" onClick={()=>setShowMar(true)}>Add/Edit Mar Record</Button></div>
                    <Input label="Notes" onChange={e => setNotes(e.currentTarget.value)} value={notes} optional />
                    <Select label="Order Type" value={orderType} onChange={e => setOrderType(e.currentTarget.value as OrderType)} optional>
                        {Object.values(OrderType).map((t, i) => <option value={t} key={i}>{t}</option>)}
                    </Select>

                    <Select label="Completed" onChange={e=>setCompleted(e.currentTarget.value === "true")}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Select>
                    <Input label="Time" onChange={e => setTime(e.currentTarget.value)} value={time} optional />

                </div>

                <Button onClick={onOrderAddClickHandler} className="bg-blue my-4">Add Order</Button>
            </BaseStage>


            <div className="absolute right-20 top-0 overflow-y-auto h-[65vh] overflow-x-hidden">
                <AnimatePresence>
                    {orders.map((order, i) =>
                        <MedicationOrdersPreviewer medOrder={order} key={i} index={i} 
                            onIndexChangeHandler={onIndexChangeHandler}
                            onEdit={() => onEditClickHandler(i)}
                            onDelete={() => onDeleteHandler(i)} />

                    )}
                </AnimatePresence>
            </div>


            <MarRecordEditor show={showMar} onClose={()=>setShowMar(false)} marRecords={mar} onSave={setMar}/>

        </div>
    )

}
