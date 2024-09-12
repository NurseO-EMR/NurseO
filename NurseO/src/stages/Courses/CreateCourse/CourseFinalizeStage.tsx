import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { BaseStage, type BaseStageProps } from "~/components/Admin/Stages/BaseStage";

export type Props = BaseStageProps & {
    courseName: string,
};

export function CourseFinalizeStage(props: Props) {
    const router = useRouter()

    const onNextClickHandler = () => {
        router.push("/nurseo_admin")
    }

    return <BaseStage {...props} title="" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home" hideBackButton>
        <h1 className="font-bold text-blue my-10">{props.courseName} has been added!</h1>
    </BaseStage>
}