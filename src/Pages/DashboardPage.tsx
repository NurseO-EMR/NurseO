import { faIdCard, faStethoscope, faBookMedical, faHeart, faHeadSideCough, faBook } from "@fortawesome/free-solid-svg-icons";
import PageView from "./PageView";
import { Step } from "../Components/Steps/Step";
import { Steps } from "../Components/Steps/Steps";
import { Form } from "../Components/Form/Form";
import { Input } from "../Components/Form/Input";
import { Button } from "../Components/Form/Button";

export default function DashboardPage() {

    return (
        <PageView>
            <Steps activeStep={0} className="mt-28">
                <Step active icon={faIdCard} />
                <Step icon={faStethoscope}/>
                <Step icon={faBookMedical} />
                <Step icon={faHeart} />
                <Step icon={faHeadSideCough}/>
                <Step icon={faBook} />
            </Steps>

            <Form>
            <Input label="Name"/>
            <Input label="Date of birth"/>
            <Input label="Gender"/>
            <Input label="Height"/>
            <Input label="Weight"/>
            <div className="flex gap-2">
                <Button className="bg-darkGray">Previous</Button>
                <Button>Next</Button>
            </div>
            </Form>
        </PageView>
    );
}