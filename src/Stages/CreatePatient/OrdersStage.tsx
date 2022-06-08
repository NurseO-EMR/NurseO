import { faBookMedical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import {MedicationOrderSyntax, MedicationOrder, OrderKind, OrderType, Frequency, Routine} from "nurse-o-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
export type Props = BaseStageProps & {
    onNext: (medicalHistory: string[]) => void,
}

export function OrdersStage(props: Props) {
    const [history, setHistory] = useState([]as string[]);
    
    const [entry, setEntry] = useState("");


    const onHistoryAddClickHandler = () => {
        history.push(entry)
        setHistory([...history]);
        setEntry("");
    }


    const onNextClickHandler = ()=> {
        props.onNext(history)
    }


    const sampleOrder: MedicationOrder = {
        orderKind: OrderKind.med,
        orderType: OrderType.admission,
        PRNNote: "",
        concentration: "20mg/kg",
        frequency: Frequency.q1hr,
        id: "1",
        mar: [],
        notes: "",
        route: "PO",
        routine: Routine.PRN
    }


    return (
        <div className="relative w-screen">
            <BaseStage {...props} onNext={onNextClickHandler} title="Medication Orders" icon={faBookMedical} moveLeft={history.length > 0}>
                <div className="grid grid-cols-3 gap-x-8">
                    <Input label="Medication Name" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Input label="Concentration" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Input label="Route" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Input label="Routine" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Input label="Frequency" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Input label="Mar" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Input label="Notes" onChange={e => setEntry(e.currentTarget.value)} value={entry}  optional/>
                    <Select label="Order Type">
                        <option className="hidden"></option>
                        <option value="MedicationOrder">Admission</option>
                        <option value="CustomOrder">Standing</option>
                        <option value="CustomOrder">Provider</option>
                    </Select>

                </div>
                
                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Order</Button>
            </BaseStage>
{/* 
            <ArrayPreviewer headerItems={["Entry"]} show={history.length > 0}>
                {history.map((entry,i)=>
                    <Tr key={i}>
                        <Td>{entry}</Td>
                    </Tr>
                )}
            </ArrayPreviewer> */}
            <div className="absolute right-20 top-0 overflow-y-auto h-[65vh]">
                {Array.from({length: 20}, (_,i)=>
                    <div className="bg-gray shadow-xl w-formWidth rounded-lg overflow-y-hidden py-5 text-center font-bold text-blue mb-4 flex justify-evenly">
                        <div><MedicationOrderSyntax medName="Amoxicillin" order={sampleOrder} /></div>
                        <div className="text-red cursor-pointer"><FontAwesomeIcon icon={faTrash} /></div>
                    </div>
                )}
                
               
            </div>

        </div>
    )

}