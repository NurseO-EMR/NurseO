import { faSyringe } from "@fortawesome/free-solid-svg-icons";
import type { Immunization, PatientChart } from "~/core/index";
import { useState } from "react";
import { Button } from "~/components/Admin/Form/Button";
import { Input } from "~/components/Admin/Form/Input";
import { ArrayPreviewer } from "~/components/Admin/Stages/ArrayPreviewer";
import { type BaseStageProps, BaseStage } from "~/components/Admin/Stages/BaseStage"
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (socialHistory: Immunization[]) => void,
    patient?: PatientChart
}

export function ImmunizationsStage(props: Props) {
    const [immunizations, setImmunizations] = useState(props.patient?.immunizations ?? [] as Immunization[]);

    const [date, setDate] = useState("");
    const [newImmunization, setNewImmunization] = useState("");


    const onHistoryAddClickHandler = () => {
        immunizations.push({ date, immunization: newImmunization })
        setImmunizations([...immunizations]);
        setDate("")
        setNewImmunization("")
    }


    const onNextClickHandler = () => {
        props.onNext(immunizations)
    }

    const onDeleteClickHandler = (index: number) => {
        immunizations.splice(index, 1)
        setImmunizations([...immunizations]);
    }


    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Immunizations" icon={faSyringe} moveLeft={immunizations.length > 0}>
                <Input label="Date" onChange={e => setDate(e.currentTarget.value)} value={date} optional />
                <Input label="Immunization" onChange={e => setNewImmunization(e.currentTarget.value)} value={newImmunization} optional />

                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Immunization Entry</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Date", "Immunization", "Delete"]} show={immunizations.length > 0} title="Added Immunizations">
                {immunizations.map((entry, i) =>
                    <Tr key={i}>
                        <Td>{entry.date}</Td>
                        <Td>{entry.immunization}</Td>
                        <Td>
                            <button className="bg-red w-full h-10 text-white font-bold"
                                onClick={() => onDeleteClickHandler(i)}>Delete</button>
                        </Td>
                    </Tr>
                )}
            </ArrayPreviewer>

        </div>
    )

}