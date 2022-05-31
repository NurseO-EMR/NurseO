import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../Components/Form/Input";
import { Select } from "../../Components/Form/Select";
import { BaseStageProps, BaseStage } from "../../Components/Stages/BaseStage"
import { DateFormat } from "../../Services/Core";

export type Props = BaseStageProps;

export function SimSpecificInfoStage(props: Props) {
    return (
        <BaseStage {...props} title="Let's focus on sim now!" icon={faHouseChimneyUser} >
            <Input label="Barcode" />
            <Input label="Age" />
            <Select label="Date Format">
                <option className="hidden"></option>
                <option value={DateFormat.NothingHidden}>01/24/1988</option>
                <option value={DateFormat.HiddenYear}>01/24/xxxx</option>
                <option value={DateFormat.HiddenMonthNYear}>xx/24/xxxx</option>
            </Select>
            <Input label="SimTime" type="time"/>
            <Input label="Labs URL" optional type="url" />
        </BaseStage>
    )

}