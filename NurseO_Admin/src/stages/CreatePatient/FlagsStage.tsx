import { faFlag } from "@fortawesome/free-solid-svg-icons";
import type { Flag, PatientChart } from "@nurse-o-core/index";
import { useState } from "react";
import { useFocus } from "~/components/customHooks";
import { Button } from "~/components/Form/Button";
import { Input } from "~/components/Form/Input";
import { ArrayPreviewer } from "~/components/Stages/ArrayPreviewer";
import { type BaseStageProps, BaseStage } from "~/components/Stages/BaseStage"
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (flags: Flag[]) => void,
    patient?:PatientChart
}

export function FlagsStage(props: Props) {
    const [inputRef, setInputFocus] = useFocus()
    const [flags, setFlags] = useState(props.patient?.flags ?? [] as Flag[]);
    const [name, setName] = useState("");
    const [reason, setReason] = useState("");


    const onFlagAddClickHandler = () => {
        flags.push({ name, reason })
        setFlags([...flags]);
        setName("")
        setReason("")
        setInputFocus();
    }


    const onNextClickHandler = ()=> {
        props.onNext(flags)
    }

    const onDeleteClickHandler = (index:number)=>{
        flags.splice(index,1)
        setFlags([...flags]);
    }


    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Flags" icon={faFlag} moveLeft={flags.length > 0}>
                <Input label="Flag" onChange={e => setName(e.currentTarget.value)} value={name} ref={inputRef} optional/>
                <Input label="Reason" onChange={e => setReason(e.currentTarget.value)} value={reason} optional/>
                <Button onClick={onFlagAddClickHandler} className="bg-blue my-4">Add Flag</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Flag", "Reason", "Delete"]} show={flags.length > 0} title="Added Flags">
                {flags.map((flag,i)=>
                    <Tr key={i}>
                        <Td>{flag.name}</Td>
                        <Td>{flag.reason}</Td>
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