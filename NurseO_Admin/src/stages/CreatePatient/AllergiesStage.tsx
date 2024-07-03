import { faHeadSideCough } from "@fortawesome/free-solid-svg-icons";
import type { Allergy, PatientChart } from "@nurse-o-core/index";
import { useState } from "react";
import { useFocus } from "~/components/customHooks";
import { Button } from "~/components/Form/Button";
import { Input } from "~/components/Form/Input";
import { ArrayPreviewer } from "~/components/Stages/ArrayPreviewer";
import { type BaseStageProps, BaseStage } from "~/components/Stages/BaseStage"
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (allergies: Allergy[]) => void,
    patient?:PatientChart
}

export function AllergiesStage(props: Props) {
    const [inputRef, setInputFocus] = useFocus()
    const [allergies, setAllergies] = useState(props.patient?.allergies ?? [] as Allergy[]);
    const [name, setName] = useState("");
    const [reaction, setReaction] = useState("");


    const onAllergyAddClickHandler = () => {
        allergies.push({ name, reaction })
        setAllergies([...allergies]);
        setName("")
        setReaction("")
        setInputFocus();
    }


    const onNextClickHandler = ()=> {
        props.onNext(allergies)
    }

    const onDeleteClickHandler = (index:number)=>{
        allergies.splice(index,1)
        setAllergies([...allergies]);
    }


    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Allergies" icon={faHeadSideCough} moveLeft={allergies.length > 0}>
                <Input label="Allergy Name" onChange={e => setName(e.currentTarget.value)} value={name} ref={inputRef} optional/>
                <Input label="Reaction" onChange={e => setReaction(e.currentTarget.value)} value={reaction} optional/>
                <Button onClick={onAllergyAddClickHandler} className="bg-blue my-4">Add Allergy</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Allergy", "Reaction", "Delete"]} show={allergies.length > 0} title="Added Allergies">
                {allergies.map((allergy,i)=>
                    <Tr key={i}>
                        <Td>{allergy.name}</Td>
                        <Td>{allergy.reaction}</Td>
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