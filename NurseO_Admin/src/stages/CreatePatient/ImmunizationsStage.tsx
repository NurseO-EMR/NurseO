import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { PatientChart } from "@nurse-o-core/index";
import { useState } from "react";
import { Button } from "~/components/Form/Button";
import { Input } from "~/components/Form/Input";
import { ArrayPreviewer } from "~/components/Stages/ArrayPreviewer";
import { BaseStageProps, BaseStage } from "~/components/Stages/BaseStage"
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (socialHistory: string[]) => void,
    patient?:PatientChart
}

export function ImmunizationsStage(props: Props) {
    const [immunizations, setImmunizations] = useState( props.patient?.immunizations || []as string[]);
    
    const [entry, setEntry] = useState("");


    const onHistoryAddClickHandler = () => {
        immunizations.push(entry)
        setImmunizations([...immunizations]);
        setEntry("");
    }


    const onNextClickHandler = ()=> {
        props.onNext(immunizations)
    }

    const onDeleteClickHandler = (index:number)=>{
        immunizations.splice(index,1)
        setImmunizations([...immunizations]);
    }


    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Immunizations" icon={faSyringe} moveLeft={immunizations.length > 0}>
                <Input label="Immunization name" onChange={e => setEntry(e.currentTarget.value)} value={entry} optional/>
                
                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Immunization Entry</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Immunization", "Delete"]} show={immunizations.length > 0} title="Added Immunizations">
                {immunizations.map((entry,i)=>
                    <Tr key={i}>
                        <Td>{entry}</Td>
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