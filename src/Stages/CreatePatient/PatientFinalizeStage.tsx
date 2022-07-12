import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";

export type Props = BaseStageProps

export function PatientFinalizeStage(props: Props) {

    const navigate = useNavigate()

    const onNextClickHandler = () => {
        navigate("/")
    }

    return <BaseStage {...props} title="Cognations" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <div>
            <h1>Your patient has been added!</h1>

        </div>
    </BaseStage>
}