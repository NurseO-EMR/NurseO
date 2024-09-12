import type { MarRecord, Time } from "~/core/index";
import { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import { Announcement, broadcastAnnouncement } from "~/services/AnnouncementService";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Td } from "../Table/Td";
import { Tr } from "../Table/Tr";
import {convertTimeToString} from "~/services/Util"

type Props = {
    marRecords: MarRecord[],
    onSave: (records: MarRecord[])=>void,
    onClose: ()=>void,
    show: boolean
}

export function MarRecordEditor(props:Props) {

    const [time, setTime] = useState("")
    const [dose, setDose] = useState("")
    const [records, setRecords] = useState<MarRecord[]>(props.marRecords)


    useEffect(()=>{
        setRecords(props.marRecords)
    }, [props.marRecords])

    const onAddRecordHandler = ()=>{
        if(!time) {
            broadcastAnnouncement("Time filed is empty", Announcement.error) 
            return
        }

        const timeFormatted = stringToTime(time)
        const record:MarRecord = {
            hour: timeFormatted.hour,
            minute: timeFormatted.minute,
            dose
        }
        records.push(record)
        setRecords([...records])
        setTime("")
        setDose("")
    }


    const onSaveClickHandler = () => {
        props.onSave(records)
        props.onClose()
    }


    const onDeleteClickHandler = (index: number) => {
        records.splice(index, 1)
        setRecords([...records])
    }

    return <PureModal isOpen={props.show} width="40vw" header="Mar Record Editor" onClose={props.onClose}>
        <div className="grid gap-4 justify-around grid-cols-2">
            <form onSubmit={e=>e.preventDefault()} className="w-full">
                <h1 className="font-bold">Add Record</h1>
                <Input label="Time" type="time" onChange={e=>setTime(e.currentTarget.value)}  value={time}/>
                <Input label="Dose (with units)"  onChange={e=>setDose(e.currentTarget.value)}  value={dose}/>
            </form>

            <div className="w-full">
                <h1 className="font-bold">View/Edit Mar Records</h1>
                <table className="w-full mt-10">
                    <thead>
                        <Tr>
                            <th className="border">Time</th>
                            <th className="border">Dose</th>
                            <th className="border">Delete</th>
                        </Tr>
                    </thead>
                    <tbody>

                        {records.map((r,i)=> <Tr key={i}>
                            <Td>{convertTimeToString(r)}</Td>
                            <Td>{r.dose ?? ""}</Td>
                            <td><button className="bg-red min-w-full h-10 text-white font-semibold px-4" onClick={()=>onDeleteClickHandler(i)}>Delete</button></td>
                        </Tr>
                        )}

                        {records.length === 0 ?  <Tr><Td>No Records Added</Td><Td> </Td><Td> </Td></Tr> : ""}

                    </tbody>
                </table>
            </div>
            <Button className="bg-success my-2 col-start-1" onClick={onAddRecordHandler}>Add Record</Button>
            <Button className="bg-blue my-2 col-start-2" onClick={onSaveClickHandler}>Save</Button>
        </div>
    </PureModal>
}



function stringToTime(marString: string): Time {
    if (marString === "") return {hour: 0, minute: 0};

    const spited = marString.split(":")

    const time: Time = {
        hour: Number.parseInt(spited[0] ?? "0"),
        minute: Number.parseInt(spited[1] ?? "0")
    }
    return time
}