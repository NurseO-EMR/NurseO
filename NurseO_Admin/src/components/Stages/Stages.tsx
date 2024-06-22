import { cloneElement, ReactElement } from "react"
import { STAGE_ANIMATION_DURATION, STAGE_DELAY_COEFFICIENT } from "../../Services/AnimationConfig";
import { Props as StageProps } from "./../../Stages/CreatePatient/BasicInfoStage"


type Props = {
    stage: number,
    children: ReactElement<StageProps>[]
}

export function Stages(props: Props): JSX.Element {

    const getStage = ()=> {
        const stage = props.children[props.stage];
        let output;
        if(props.stage === 0) output = stage
        else output = cloneElement(stage, { delay: STAGE_ANIMATION_DURATION * STAGE_DELAY_COEFFICIENT})
        return output;
    }


    return <div className="overflow-y-hidden">
        {getStage()}
    </div>
}