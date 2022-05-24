import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../Components/Form/Button";
import { Form } from "../../Components/Form/Form";
import { Input } from "../../Components/Form/Input";

type Props = {
    onNextClickHandler: ()=>void,
    animationDuration: number,
    show: boolean
}

export function BasicInfoStage(props:Props) {
    return (
        <AnimatePresence>
            {props.show ? 
                <Form animationDuration={props.animationDuration} title="Let`s collect some basic information about your patient" icon={faIdCard}>
                    <Input label="Name" />
                    <Input label="Date of birth" />
                    <Input label="Gender" />
                    <Input label="Height" />
                    <Input label="Weight" />

                    <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ delay: props.animationDuration - 0.5 }}>
                        <Button className="bg-darkGray">Previous</Button>
                        <Button className="bg-blue" onClick={props.onNextClickHandler}>Next</Button>
                    </motion.div>
                </Form>
            : null}
        </AnimatePresence>
    )

}