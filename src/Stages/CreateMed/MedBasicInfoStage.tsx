import { faPills } from "@fortawesome/free-solid-svg-icons";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { Input } from "../../Components/Form/Input";
import { SearchableSelect } from "../../Components/Form/SearchableSelect";
import { Select } from "../../Components/Form/Select";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";
import { Medication } from "nurse-o-core";
import { Database } from "../../Services/Database";
import {v4 as uuid} from "uuid"

export type Props = BaseStageProps & {
    onNext: (id: string, name: string, narcoticCountNeeded: boolean) => void
};

export function MedBasicInfoStage(props: Props) {

    const [meds, setMeds] = useState([] as Medication[])

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [narcoticCount, setNarcoticCount] = useState("")

    useEffect(() => {
        async function getMeds() {
            const db = Database.getInstance();
            const medications = await db.getMedications();
            setMeds(medications);
        }
        getMeds();
    }, [])


    const onNextClickHandler = () => {
        const narcoticCountBoolean = narcoticCount === "yes"
        props.onNext(id, name, narcoticCountBoolean)
    }


    const onMedNameChangeHandler = (id: string) => {
        const IDedMed = find(meds, { id })
        setId(id)
        if (IDedMed) {
            setNarcoticCount(IDedMed.narcoticCountNeeded ? "true" : "false")
            setName(IDedMed.name)
        }
    }


    const onNewMedCreated = (name: string) => {
        const med:Medication = {
            name: name,
            id: uuid(),
            narcoticCountNeeded: false,
            locations: []
        }
        meds.push(med);
        setName(name)
        setId(med.id)
        setNarcoticCount("false")
        setMeds(meds)
    }

    return <BaseStage {...props} title="Let's start with the basics, medName and barcode please!" icon={faPills} onNext={onNextClickHandler}>
        <Input label="medID" value={id} disabled onChange={e => setId(e.currentTarget.value)} />
        <SearchableSelect label="Med Name" options={meds} labelKey="name" valueKey="id" onChange={onMedNameChangeHandler}
            creatable onCreateOption={onNewMedCreated} value={id} />
        <Select label="Does this medication require Narcotic count?" onChange={e => setNarcoticCount(e.currentTarget.value)} value={narcoticCount}>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </Select>
    </BaseStage>
}