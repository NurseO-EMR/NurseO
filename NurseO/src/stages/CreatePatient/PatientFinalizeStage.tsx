import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { BaseStage, type BaseStageProps } from "~/components/Admin/Stages/BaseStage";

export type Props = BaseStageProps & {
    customMessage?: string
}

export function PatientFinalizeStage(props: Props) {

    const router = useRouter()

    const onNextClickHandler = () => {
        router.push("/nurseo_admin")
    }

    return <BaseStage {...props} title="Congratulations" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <div>
            <h1>
                {props.customMessage ?? "Your patient has been added!"}
            </h1>

        </div>
    </BaseStage>
}