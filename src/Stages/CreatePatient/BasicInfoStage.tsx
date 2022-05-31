import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { Input} from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "./../../Components/Stages/BaseStage"
import { Gender } from "../../Services/Core";

export type Props = BaseStageProps;

export function BasicInfoStage(props: Props) {
    return (
        <BaseStage {...props} title="Let`s collect some basic information about your patient" icon={faIdCard} >
                <Input label="Name" />
                <Input label="Date of birth" type="date" />
                <Select label="Gender">
                    <option className="hidden"></option>
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                    <option value={Gender.Other}>Other</option>
                </Select>
                <Input label="Height" suffix="cm" type="number" />
                <Input label="Weight" suffix="kg" type="number"/> 
                              
        </BaseStage>
    )

}