import { AnimatePresence, motion } from "framer-motion"
import { ReactElement } from "react"
import { Form } from "../Form/Form"
import { Button } from "../Form/Button";
import { Props as InputProps } from "../../Components/Form/Input";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type BaseStageProps = {
    onNextClickHandler: () => void,
    animationDuration: number,
    show: boolean,
    delay?: number,
}

type Props = BaseStageProps & {
    children: ReactElement<InputProps> | ReactElement<InputProps>[],
    title: string,
    icon: IconProp
}

export function BaseStage(props: Props) {
    return (
        <AnimatePresence>
            {props.show ? 
            <Form animationDuration={props.animationDuration} title={props.title} icon={props.icon} delay={props.delay}>
                <>{props.children}</>

                <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: props.animationDuration - 0.5 }}>
                    <Button className="bg-darkGray">Previous</Button>
                    <Button className="bg-blue" onClick={props.onNextClickHandler}>Next</Button>
                </motion.div>

            </Form>
            : null}
        </AnimatePresence>
    )

}