import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { MedicationOrder, OrderKind, OrderType, Frequency, Routine, Time, PatientChart } from "nurse-o-core"
import { MedicationOrdersPreviewer } from "../../Components/Stages/MedicationOrdersPreviewer";
import { AnimatePresence } from "framer-motion";
import { Database } from "../../Services/Database";
import { SearchableSelect } from "../../Components/Form/SearchableSelect";
import { Medication } from "nurse-o-core";
import { broadcastAnnouncement, Announcement } from "../../Services/ErrorService";

export type Props = BaseStageProps & {
    onNext: (orders: MedicationOrder[]) => void,
    patient?: PatientChart
}

export function OrdersStage(props: Props) {
    const marRef = useRef<HTMLInputElement>(null);
    const [meds, setMeds] = useState([] as Medication[])

    const [id, setId] = useState("");
    const [concentration, setConcentration] = useState("");
    const [route, setRoute] = useState("");
    const [routine, setRoutine] = useState(Routine.NA);
    const [PRNNote, setPRNNote] = useState("");
    const [frequency, setFrequency] = useState(Frequency.NA);
    const [marString, setMarString] = useState("");
    const [notes, setNotes] = useState("");
    const [orderType, setOrderType] = useState(OrderType.NA);
    const [completed, setCompleted] = useState(false);

    const [orders, setOrders] = useState(props.patient?.medicationOrders || [] as MedicationOrder[]);


    useEffect(() => {
        async function getMeds() {
            const db = Database.getInstance();
            const medications = await db.getMedications();
            setMeds(medications);
        }
        getMeds();
    }, [])

    const onOrderAddClickHandler = () => {

        //check if there is med 
        if (!id) { broadcastAnnouncement("No med selected", Announcement.error); return; }
        if (orderType === OrderType.NA) {broadcastAnnouncement("must select order type", Announcement.error); return; }
        if (!marRef.current?.checkValidity()) return;

        const order: MedicationOrder = {
            id: id,
            concentration,
            route,
            routine,
            frequency,
            mar: marToTime(marString),
            notes,
            orderType,
            PRNNote,
            orderKind: OrderKind.med,
            completed
        }

        orders.push(order)
        setOrders([...orders]);

    }


    const onNextClickHandler = () => {
        props.onNext(orders)
    }

    const onIndexChangeHandler = (oldIndex:number, newIndex: number) => {
        console.log(oldIndex, newIndex)
        if (newIndex < 0 || newIndex >= orders.length - 1) {
            broadcastAnnouncement("can't move this item", Announcement.error); 
            return; 
        }

        const temp = orders[oldIndex]
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
        // frequency
        const order = orders[index];
        const indexableFrequency:{[key: string]:string} = Frequency
        const values = Object.values(Frequency)
        const keys = Object.keys(Frequency)
        const frequencyKeyIndex = values.indexOf(order.frequency as Frequency)
        const frequencyKey = indexableFrequency[keys[frequencyKeyIndex]]

        //mar
        let marString = ""
        for(const time of order.mar) {
            const temp = `${time.hour.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}`
            if(marString !== "") marString +=","
            marString += temp
        }

        
        setId(order.id)
        setConcentration(order.concentration)
        setRoute(order.route)
        setRoutine(order.routine)
        setPRNNote(order.PRNNote || "")
        setFrequency(frequencyKey as Frequency)
        setMarString(marString)
        setNotes(order.notes)
        setOrderType(order.orderType)
        setCompleted(order.completed || false)
        console.log(order.mar)
    }


    return (
        <div className="relative w-screen">
            <BaseStage {...props} onNext={onNextClickHandler} title="Medication Orders" icon={faBookMedical} moveLeft={orders.length > 0}>
                <div className="grid grid-cols-3 gap-x-8 max-w-[50vw]">
                    <SearchableSelect label="Medication Name (generic)" options={meds} labelKeys={["genericName", "brandName"]} valueKey="id" value={id} onChange={setId} />

                    <Input label="Concentration" onChange={e => setConcentration(e.currentTarget.value)} value={concentration} optional placeholder="ex: 20mg/kg" />
                    <Input label="Route" onChange={e => setRoute(e.currentTarget.value)} value={route} optional />

                    <Select label="Routine" onChange={e => setRoutine(e.currentTarget.value as Routine)} value={routine} optional>
                        {Object.values(Routine).map((r, i) => <option value={r} key={i}>{r}</option>)}
                    </Select>

                    {routine === Routine.PRN ? <Input label="PRN Note" onChange={e => setPRNNote(e.currentTarget.value)} value={PRNNote} optional /> : null}

                    <Select label="Frequency" onChange={e => setFrequency(e.currentTarget.value as Frequency)} value={frequency} optional>
                        {Object.values(Frequency).map((f, i) => <option value={f} key={i}>{f}</option>)}
                    </Select>


                    <Input label="Mar" onChange={e => setMarString(e.currentTarget.value)} value={marString}
                        placeholder="01:00, 14:00, 16:00" pattern="(([0-2][0-9]:[0-6][0-9]),{0,1})+" ref={marRef} optional
                        title="enter times in 24 hour format with commas in between, example: 01:00,14:00 which means it was administered at 1 am and 2 pm "
                    />


                    <Input label="Notes" onChange={e => setNotes(e.currentTarget.value)} value={notes} optional />
                    <Select label="Order Type" value={orderType} onChange={e => setOrderType(e.currentTarget.value as OrderType)} optional>
                        {Object.values(OrderType).map((t, i) => <option value={t} key={i}>{t}</option>)}
                    </Select>

                    <Select label="Completed" onChange={e=>setCompleted(e.currentTarget.value === "true")}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </Select>

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

        </div>
    )

}




function marToTime(marString: string): Time[] {
    if (marString === "") return [];

    const output: Time[] = [];
    const splitedTimes = marString.split(",")
    const splitedByCommaAndColon = splitedTimes.map(time => time.split(":"))
    for (const timeString of splitedByCommaAndColon) {
        const time: Time = {
            hour: Number.parseInt(timeString[0]),
            minutes: Number.parseInt(timeString[1])
        }
        output.push(time)
    }
    return output
}