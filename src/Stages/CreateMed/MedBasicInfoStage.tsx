import { faPills } from "@fortawesome/free-solid-svg-icons";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { Input } from "../../Components/Form/Input";
import { SearchableSelect } from "../../Components/Form/SearchableSelect";
import { Select } from "../../Components/Form/Select";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";
import { Medication } from "nurse-o-core";
import { Database } from "../../Services/Database";
import { v4 as uuid } from "uuid"

export type Props = BaseStageProps & {
    onNext: (id: string, brandName: string, genericName: string, narcoticCountNeeded: boolean) => void
};

export function MedBasicInfoStage(props: Props) {

    const [meds, setMeds] = useState([] as Medication[])

    const [id, setId] = useState("")
    const [brandName, setBrandName] = useState("")
    const [genericName, setGenericName] = useState("")
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
        props.onNext(id, brandName, genericName, narcoticCountBoolean)
    }


    const onMedNameChangeHandler = (id: string) => {
        const IDedMed = find(meds, { id })
        setId(id)
        if (IDedMed) {
            setNarcoticCount(IDedMed.narcoticCountNeeded ? "true" : "false")
            setBrandName(IDedMed.brandName || "")
            setGenericName(IDedMed.genericName || "")
        }
    }


    const onNewMedCreated = (brandName?: string, genericName?: string) => {
        const med: Medication = {
            brandName,
            genericName,
            id: uuid(),
            narcoticCountNeeded: false,
            locations: []
        }

        meds.push(med);
        setBrandName(brandName || "")
        setGenericName(genericName || "")
        setId(med.id)
        setNarcoticCount("false")
        setMeds(meds)
    }

    return <BaseStage {...props} title="Let's start with the basics, brand, generic, and barcode please!" icon={faPills} onNext={onNextClickHandler}>
        <Input label="medID" value={id} disabled onChange={e => setId(e.currentTarget.value)} />

        <SearchableSelect label="Brand Name" options={meds} labelKey="brandName" valueKey="id" onChange={onMedNameChangeHandler}
            creatable onCreateOption={(name)=>onNewMedCreated(name, undefined)} value={id} />

        <SearchableSelect label="Generic Name" options={meds} labelKey="genericName" valueKey="id" onChange={onMedNameChangeHandler}
            creatable onCreateOption={(name)=>onNewMedCreated(undefined, name)} value={id} />

        <Select label="Does this medication require Narcotic count?" onChange={e => setNarcoticCount(e.currentTarget.value)} value={narcoticCount}>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </Select>
    </BaseStage>
}