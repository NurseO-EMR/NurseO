import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";

export type Props = BaseStageProps & {
    adminEmailAddress: string,
};

export function AdminStageFinalized(props:Props) {
    const navigate = useNavigate()



    const onNextClickHandler = () => {
        navigate("/")
    }

    return <BaseStage {...props} title="" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <h1 className="font-bold text-blue my-10">Admin {props.adminEmailAddress} has been added!</h1>
    </BaseStage>
}