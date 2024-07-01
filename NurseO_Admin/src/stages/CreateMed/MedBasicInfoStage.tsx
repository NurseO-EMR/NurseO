import { faPills } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Input } from "~/components/Form/Input";
import { SearchableSelect } from "~/components/Form/SearchableSelect";
import { Select } from "~/components/Form/Select";
import { BaseStage, type BaseStageProps } from "~/components/Stages/BaseStage";
import type { Medication } from "@nurse-o-core/index";
import { api } from "~/utils/api";
import { LoadingCard } from "~/components/loadingCard";

export type Props = BaseStageProps & {
    onNext: (id: number, brandName: string, genericName: string, narcoticCountNeeded: boolean) => void
};

export function MedBasicInfoStage(props: Props) {

    const {data: meds, isLoading} = api.medication.getAllMeds.useQuery()

    const [id, setId] = useState(-1)
    const [brandName, setBrandName] = useState("")
    const [genericName, setGenericName] = useState("")
    const [narcoticCount, setNarcoticCount] = useState("")
    const [switchBrandToFreeText, setSwitchBrandToFreeText] = useState(false)
    const [disableBrandName, setDisableBrandName] = useState(false)


    const onNextClickHandler = () => {
        const narcoticCountBoolean = narcoticCount === "yes"
        props.onNext(id, brandName, genericName, narcoticCountBoolean)
    }


    const onMedNameChangeHandler = (id: string) => {
        const numericId = parseInt(id)
        const IDedMed = meds?.find(m=>m.id === numericId)
        setId(numericId)
        if (IDedMed) {
            setNarcoticCount(IDedMed.narcoticCountNeeded ? "true" : "false")
            setBrandName(IDedMed.brandName ?? "")
            setGenericName(IDedMed.genericName ?? "")
            setSwitchBrandToFreeText(true)
        }
    }


    const onNewMedCreated = (brandName?: string, genericName?: string) => {
        console.log("hello")
        const med: Medication = {
            id: -1,
            brandName,
            genericName,
            narcoticCountNeeded: false,
            locations: []
        }

        if(!meds) return;

        meds.push(med);
        setBrandName(brandName ?? "")
        setGenericName(genericName ?? "")
        setId(med.id)
        setNarcoticCount("false")
        setSwitchBrandToFreeText(true)
        setDisableBrandName(false)
    }

    if(isLoading && !meds) return <LoadingCard />

    return <BaseStage {...props} title="Let's start with the basics, brand, generic, and barcode please!" icon={faPills} onNext={onNextClickHandler}>

        <SearchableSelect label="Generic Name" options={meds!} labelKeys={["genericName"]} valueKey="id" onChange={onMedNameChangeHandler}
            creatable onCreateOption={(name) => onNewMedCreated(undefined, name)} value={id} />
        {switchBrandToFreeText ?
            <Input label="Brand Name" disabled={disableBrandName} onChange={e => setBrandName(e.currentTarget.value)}
                value={brandName} />
            :
            <SearchableSelect label="Brand Name" options={meds!} labelKeys={["brandName"]} valueKey="id" onChange={onMedNameChangeHandler} value={id} />
        }


        <Select label="Does this medication require Narcotic count?" onChange={e => setNarcoticCount(e.currentTarget.value)} value={narcoticCount}>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </Select>
    </BaseStage>
}