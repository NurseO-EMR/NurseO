import PageView from "./PageView";
import { Steps } from "../Components/Steps/Steps";
import { useState } from "react";
import { Stages } from "../Components/Stages/Stages";


export default function CreateMedicationPage() {

   const [currentStage, setCurrentStage] = useState(0)

   


   const onNextClickHandler = () => {
       const stage = currentStage + 1;
       setCurrentStage(stage);
   }


   return (
       <PageView>
           {/* <Steps activeStep={currentStage} className="mt-24">
                   
           </Steps>

           <Stages stage={currentStage}>
              
           </Stages> */}
       </PageView>
   );
}