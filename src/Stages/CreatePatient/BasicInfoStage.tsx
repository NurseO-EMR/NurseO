import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { Input} from "../../Components/Form/Input";
import { BaseStageProps, BaseStage } from "./../../Components/Stages/BaseStage"

export type Props = BaseStageProps;

export function BasicInfoStage(props: Props) {
    return (
        <BaseStage {...props} title="Let`s collect some basic information about your patient" icon={faIdCard} >
                <Input label="Name" />
                <Input label="Date of birth" type="date" />
                <Input label="Gender" />
                <Input label="Height" />
                <Input label="Weight" />               
        </BaseStage>
    )

}