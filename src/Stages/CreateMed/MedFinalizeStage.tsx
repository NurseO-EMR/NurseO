import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";

export type Props = BaseStageProps & {
    onNext:()=>void
};

export function MedFinalizeStage(props:Props) {



    const onNextClickHandler = () => {
        console.log("hello")
    }






    return <BaseStage {...props} title="Cognations" icon={faFileInvoice} onNext={onNextClickHandler}>
        
    </BaseStage>
}