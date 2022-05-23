import { ReactChild } from "react";
import { StepConnector } from "./StepConnector";

type Props = {
    //the child here should only be steps from the "./Step.tsx" file
    children: ReactChild[],
    activeStep: number,
    className?:string
}
export function Steps(props:Props) {
    
    
    return (
        <div className={`relative grid justify-center align-middle h-20 ${props.className}`} style={{width:163.5*props.children.length}}>
            {props.children.map((step,i)=>
            <div key={i} className="absolute top-0" style={{left: 180*i}}>
                {step}
                {props.children.length-1>i ? 
                <>
                    {props.activeStep >= i ? 
                    <StepConnector style={{left:77, background: "#F63B3B"}} />
                    : <StepConnector style={{left:77}} />
                    }
                </>
                : null}
            </div>
            )}
        </div>
    )
}