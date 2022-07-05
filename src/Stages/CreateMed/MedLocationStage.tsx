import { faPills } from "@fortawesome/free-solid-svg-icons";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { Input } from "../../Components/Form/Input";
import { SearchableSelect } from "../../Components/Form/SearchableSelect";
import { Select } from "../../Components/Form/Select";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";
import { MedicationLocation} from "../../Services/Core";
import { Database } from "../../Services/Database";

export type Props = BaseStageProps & {
    onNext:(id:string,name:string,barcode:string,narcoticCountNeeded:boolean)=>void
};

export function MedLocationStage(props:Props) {

    const [locations, setLocations] = useState([] as MedicationLocation[])


    useEffect(()=>{
        async function getLocations() {
            const db = Database.getInstance();
            const settings = await db.getSettings();
            setLocations(settings.locations);
        }
        getLocations();
    }, [])


    const onNextClickHandler = () => {
        console.log("hello")
        console.log(locations)
    }






    return <BaseStage {...props} title="Let's start with the basics, medName and barcode please!" icon={faPills} onNext={onNextClickHandler}>
        {/* <SearchableSelect label="Buildings" options={meds} labelKey="name" valueKey="id" onChange={onMedNameChangeHandler} value={id}/> */}
        
    </BaseStage>
}