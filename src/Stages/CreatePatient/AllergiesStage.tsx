import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import { PatientChart } from "nurse-o-core";
import { Button } from "../../Components/Form/Button";
import { Input } from "../../Components/Form/Input";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { createEmptyPatient } from "../../Services/Util";

export type Props = BaseStageProps & {
    onNextClickHandler: () => void,
}

export function AllergiesStage(props: Props) {

    const patient: PatientChart = createEmptyPatient();
    
    const onAllergyAddClickHandler = ()=>{
        console.log("hello")
    }

    return (
        <BaseStage {...props} title="Let's focus on sim now!" icon={faHouseChimneyUser} >
            <Input label="Allergy Name" />
            <Input label="Reaction" />
            
            <Button onClick={onAllergyAddClickHandler} className="bg-blue my-4">Add Allergy</Button>
        </BaseStage>
    )

}