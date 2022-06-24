import { cloneElement, ReactElement } from "react";
import { StepConnector } from "./StepConnector";
import { Props as StepProps } from "./Step"

type Props = {
    //the child here should only be steps from the "./Step.tsx" file
    children: ReactElement<StepProps>[],
    activeStep: number,
    className?: string
}
export function Steps(props: Props) {

    const screenSize = window.screen.width * 0.78;
    const itemsWidth = screenSize / (props.children.length)
    return (
        <div className="w-screen grid justify-center">
            <div className={`relative h-20 flex ${props.className}`} style={{ width: screenSize - itemsWidth/2}}>
                {props.children.map((step, i) =>
                    <div key={i} className="absolute top-0" style={{ left: itemsWidth * i }}>
                        {
                            checkIfStepIsActive(props.children, step, i, props.activeStep)
                        }
                        {props.children.length - 1 > i ?
                            <>
                                {props.activeStep > i ? 
                                <StepConnector style={{width:itemsWidth, background: "#F63B3B"}} />
                                : <StepConnector style={{width:itemsWidth}} />
                                }
                            </>
                            : null}
                    </div>
                )}
            </div>
        </div>
    )
}



function checkIfStepIsActive(children: ReactElement<StepProps>[], step: ReactElement<StepProps>, index: number, activeStep: number): ReactElement<StepProps> {
    if (index <= activeStep) return cloneElement(step, { active: true });
    return step;
}