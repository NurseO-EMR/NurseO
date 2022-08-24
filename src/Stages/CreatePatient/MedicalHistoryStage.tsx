import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useFocus } from "../../Components/customHooks";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { ArrayPreviewer } from "../../Components/Stages/ArrayPreviewer";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { MedicalHistory, PatientChart } from "nurse-o-core";

export type Props = BaseStageProps & {
    onNext: (medicalHistory: MedicalHistory[]) => void,
    patient?:PatientChart
}

export function MedicalHistoryStage(props: Props) {
    const [inputRef, setInputFocus] = useFocus()
    const [history, setHistory] = useState(props.patient?.medicalHistory || []as MedicalHistory[]);
    
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");


    const onHistoryAddClickHandler = () => {
        history.push({date,title,notes})
        setHistory([...history]);
        setDate("");
        setTitle("")
        setNotes("");
        setInputFocus();
    }


    const onNextClickHandler = ()=> {
        props.onNext(history)
    }

    
    const onDeleteClickHandler = (index:number)=>{
        history.splice(index,1)
        setHistory([...history]);
    }


    return (
        <div className="relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Medical History" icon={faBookMedical} moveLeft={history.length > 0}>
                <Input label="Date" type="date" onChange={e => setDate(e.currentTarget.value)} value={date} optional/>
                <Input label="Diagnosis Title" onChange={e => setTitle(e.currentTarget.value)} value={title} ref={inputRef} optional/>
                <Input label="Notes" onChange={e => setNotes(e.currentTarget.value)} value={notes} ref={inputRef} optional/>
                
                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Medical History Entry</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Date", "Diagnosis", "Notes", "Delete"]} show={history.length > 0} title="Added History">
                {history.map((event,i)=>
                    <Tr key={i}>
                        <Td>{event.date}</Td>
                        <Td>{event.title}</Td>
                        <Td>{event.notes}</Td>
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