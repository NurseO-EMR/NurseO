import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";

export type Props = BaseStageProps & {
    buildingName: string,
    stationName: string
};

export function LocationFinalizeStage(props:Props) {
    const navigate = useNavigate()



    const onNextClickHandler = () => {
        navigate("/")
    }






    return <BaseStage {...props} title="" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <h1 className="font-bold text-blue my-10">Location {props.buildingName}-{props.stationName} has been added!</h1>
    </BaseStage>
}