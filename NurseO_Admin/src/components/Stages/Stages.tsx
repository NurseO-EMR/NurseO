import { cloneElement, type ReactElement } from "react"
import { STAGE_ANIMATION_DURATION, STAGE_DELAY_COEFFICIENT } from "~/services/AnimationConfig";
import type { Props as StageProps } from "~/stages/CreatePatient/BasicInfoStage"


type Props = {
    stage: number,
    children: ReactElement<StageProps>[]
}

export function Stages(props: Props): JSX.Element {

    const getStage = ()=> {
        const stage = props.children[props.stage];
        if (!stage) return;
        let output;
        if(props.stage === 0) output = stage
        else output = cloneElement(stage, { delay: STAGE_ANIMATION_DURATION * STAGE_DELAY_COEFFICIENT})
        return output;
    }


    return <div className="overflow-y-hidden">
        {getStage()}
    </div>
}