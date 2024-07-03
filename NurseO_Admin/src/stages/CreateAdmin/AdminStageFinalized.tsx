import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { BaseStage, type BaseStageProps } from "~/components/Stages/BaseStage";

export type Props = BaseStageProps & {
    adminEmailAddress: string,
};

export function AdminStageFinalized(props:Props) {
    const router = useRouter()



    const onNextClickHandler = () => {
        router.push("/")
    }

    return <BaseStage {...props} title="" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <h1 className="font-bold text-blue my-10">Admin {props.adminEmailAddress} has been added!</h1>
    </BaseStage>
}