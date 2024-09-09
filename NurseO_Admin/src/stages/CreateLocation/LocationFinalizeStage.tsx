import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { BaseStage, type BaseStageProps } from "~/components/Stages/BaseStage";

export type Props = BaseStageProps & {
    buildingName: string,
    stationName: string
};

export function LocationFinalizeStage(props: Props) {
    const router = useRouter()

    const onNextClickHandler = () => {
        router.push("/nurseo_admin")
    }

    return <BaseStage {...props} title="" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <h1 className="font-bold text-blue my-10">Location {props.buildingName}-{props.stationName} has been added!</h1>
    </BaseStage>
}