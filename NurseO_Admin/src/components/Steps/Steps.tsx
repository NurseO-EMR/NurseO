import { cloneElement, type ReactElement, useEffect, useState } from "react";
import { StepConnector } from "./StepConnector";
import type { Props as StepProps } from "./Step"

type Props = {
    //the child here should only be steps from the "./Step.tsx" file
    children: ReactElement<StepProps>[],
    activeStep: number,
    className?: string,
    stageSwitchFn?: (stage:number)=>void
}
export function Steps(props: Props) {

    const [screenSize, setScreenSize] = useState(0)
    const itemsWidth = screenSize / (props.children.length)
    const INDIVIDUAL_STEP_SIZE = 80 //px


    useEffect(()=>{
        setScreenSize(window.screen.width * 0.78)
    }, [])

    return (
        <div className="w-screen grid justify-center">
            <div className={`relative h-20 flex mt-[11vh] ${props.className}`}
             style={{ width: (itemsWidth*(props.children.length-1)+INDIVIDUAL_STEP_SIZE)}}>

                {props.children.map((step, i) =>
                    <div key={i} className="absolute top-0"
                     onClick={()=>props.stageSwitchFn ? props.stageSwitchFn(i) : undefined}
                     style={{ left: itemsWidth * i }}>
                        {
                            checkIfStepIsActive(step, i, props.activeStep)
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



function checkIfStepIsActive( step: ReactElement<StepProps>, index: number, activeStep: number): ReactElement<StepProps> {
    if (index <= activeStep) return cloneElement(step, { active: true });
    return step;
}