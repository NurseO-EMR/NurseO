import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { ArrayPreviewer } from "../../Components/Stages/ArrayPreviewer";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (socialHistory: string[]) => void,
}

export function ImmunizationsStage(props: Props) {
    const [immunizations, setImmunizations] = useState([]as string[]);
    
    const [entry, setEntry] = useState("");


    const onHistoryAddClickHandler = () => {
        immunizations.push(entry)
        setImmunizations([...immunizations]);
        setEntry("");
    }


    const onNextClickHandler = ()=> {
        props.onNext(immunizations)
    }


    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Immunizations" icon={faSyringe} moveLeft={history.length > 0}>
                <Input label="Immunization name" onChange={e => setEntry(e.currentTarget.value)} value={entry} optional/>
                
                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Immunization Entry</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Immunization"]} show={history.length > 0} title="Added Immunizations">
                {immunizations.map((entry,i)=>
                    <Tr key={i}>
                        <Td>{entry}</Td>
                    </Tr>
                )}
            </ArrayPreviewer>

        </div>
    )

}