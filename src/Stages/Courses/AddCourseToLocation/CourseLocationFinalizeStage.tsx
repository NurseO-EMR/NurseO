import { faFileInvoice } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { BaseStage, BaseStageProps } from "../../../Components/Stages/BaseStage"

export type Props = BaseStageProps


export function CourseLocationFinalizeStage(props:Props) {
    const navigate = useNavigate()

    const onNextClickHandler = () => {
        navigate("/")
    }

    return <BaseStage {...props} title="" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <h1 className="font-bold text-blue my-10">courses has been added to their location!</h1>
    </BaseStage>
}