import { Children, cloneElement, ReactElement } from "react"
import { STAGE_ANIMATION_DURATION, STAGE_DELAY_COEFFICIENT } from "../../Services/AnimationConfig";
import { Props as StageProps } from "./../../Stages/CreatePatient/BasicInfoStage"


type Props = {
    stage: number,
    children: ReactElement<StageProps>[]
}

export function Stages(props: Props): JSX.Element {
    return <div className="overflow-hidden">
        {Children.map(props.children, (child, i) => {
            if (i === 0) return child;
            else return cloneElement(child, { delay: STAGE_ANIMATION_DURATION * STAGE_DELAY_COEFFICIENT})

        })}
    </div>
}