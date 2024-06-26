import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Input } from "~/components/Form/Input";
import { BaseStage, BaseStageProps } from "~/components/Stages/BaseStage";

export type Props = BaseStageProps & {
    onNext:(adminEmail: string)=>void
};

export function AdminEmailStage(props:Props) {
    const [adminEmail, setSetAdminEmail] = useState("");
    const [waiting, setWaiting] = useState(false)


    const onNextClickHandler = () => {
        setWaiting(true)
        props.onNext(adminEmail)
    }






    return <BaseStage {...props} title="Location Info" icon={faBuilding} onNext={onNextClickHandler} customNextText={waiting ? "Loading..." : "Next"}>
        <Input label="Email Address" type="email" onChange={e=>setSetAdminEmail(e.currentTarget.value)} value={adminEmail} />
    </BaseStage>
}