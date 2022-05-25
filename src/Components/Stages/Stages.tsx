import { Children, cloneElement, ReactElement } from "react"
import { Props as StageProps } from "./../../Stages/CreatePatient/BasicInfoStage"


type Props = {
    stage: number,
    animationDuration: number,
    children: ReactElement<StageProps>[]
}

export function Stages(props: Props): JSX.Element {
    const delayCoefficient = 1;

    return <div className="overflow-hidden">
        {Children.map(props.children, (child, i) => {
            if (i === 0) return child;
            else return cloneElement(child, { delay: props.animationDuration * delayCoefficient})

        })}
    </div>
}