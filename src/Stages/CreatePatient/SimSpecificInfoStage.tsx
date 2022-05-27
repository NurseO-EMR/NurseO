import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../Components/Form/Input";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"

export type Props = BaseStageProps;

export function SimSpecificInfoStage(props: Props) {
    return (
        <BaseStage {...props} title="Let's focus on sim now!" icon={faHouseChimneyUser} >
            <Input label="Barcode" />
            <Input label="Age" />
            <Input label="Date Format" />
            <Input label="SimTime" />
            <Input label="Labs URL" optional />
        </BaseStage>
    )

}