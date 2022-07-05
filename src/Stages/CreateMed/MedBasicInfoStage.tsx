import { faPills } from "@fortawesome/free-solid-svg-icons";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { Input } from "../../Components/Form/Input";
import { SearchableSelect } from "../../Components/Form/SearchableSelect";
import { Select } from "../../Components/Form/Select";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";
import { MedicationModified as Medication } from "../../Services/Core";
import { Database } from "../../Services/Database";

export type Props = BaseStageProps & {
    onNext:(id:string,name:string,barcode:string,narcoticCountNeeded:boolean)=>void
};

export function MedBasicInfoStage(props:Props) {

    const [meds, setMeds] = useState([] as Medication[])

    const [id, setId] = useState("")
    const [barcode, setBarcode] = useState("")
    const [narcoticCount, setNarcoticCount] = useState("")

    useEffect(()=>{
        async function getMeds() {
            const db = Database.getInstance();
            const medications = await db.getMedications();
            setMeds(medications);
        }
        getMeds();
    }, [])


    const onNextClickHandler = () => {
        const med = find(meds,{id})
        if(med) {
            props.onNext(med.id,med.name,med.medBarCode,med.narcoticCountNeeded)
        } else {
            throw new Error("MedBasicInfoStage.tsx: on next triggered but med is not found")
        }
    }


    const onMedNameChangeHandler = (id: string)=>{
        const IDedMed = find(meds, {id})
        setId(id)
        if(IDedMed) setNarcoticCount(IDedMed.narcoticCountNeeded ? "true" : "false")
    }


    const onNewMedCreated = (name:string) => {
        let id = 0;
        let idIsUnique = false
        while(!idIsUnique) {
            id = Date.now()    
            if(find(meds, {id}) === undefined) idIsUnique = true
        }

        meds.push({
            name,
            id: id.toString(),
            building: "",
            drawer: "",
            medBarCode: "",
            narcoticCountNeeded: false,
            station: ""
        })
        setId(id.toString())
    }

    return <BaseStage {...props} title="Let's start with the basics, medName and barcode please!" icon={faPills} onNext={onNextClickHandler}>
        <Input label="medID" value={id} disabled onChange={e=>setId(e.currentTarget.value)} />
        <SearchableSelect label="Med Name" options={meds} labelKey="name" valueKey="id" onChange={onMedNameChangeHandler}
             creatable onCreateOption={onNewMedCreated} value={id}/>
        <Input label="Med Barcode" onChange={e=>setBarcode(e.currentTarget.value)}  value={barcode} />
        <Select label="Does this medication require Narcotic count?" onChange={e=>setNarcoticCount(e.currentTarget.value)} value={narcoticCount}>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </Select>
    </BaseStage>
}