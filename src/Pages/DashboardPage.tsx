import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough, faBook } from "@fortawesome/free-solid-svg-icons";
import PageView from "./PageView";
import { Step } from "../Components/Steps/Step";
import { Steps } from "../Components/Steps/Steps";
import { FormTest } from "./testing/FormTest";

export default function DashboardPage() {

    return (
        <PageView>
            <Steps activeStep={0} className="mt-32">
                <Step active icon={faIdCard} />
                <Step icon={faStethoscope}/>
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faHeadSideCough}/>
                <Step icon={faBook} />
            </Steps>

            <FormTest></FormTest>
        </PageView>
    );
}