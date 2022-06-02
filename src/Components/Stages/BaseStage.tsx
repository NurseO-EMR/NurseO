import { AnimatePresence, motion } from "framer-motion"
import { createRef, ReactElement } from "react"
import { Form } from "../Form/Form"
import { Button } from "../Form/Button";
import { Props as InputProps } from "../../Components/Form/Input";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { STAGE_ANIMATION_DURATION } from "../../Services/AnimationConfig";

export type BaseStageProps = {
    onNext: () => void,
    onPrev: () => void,
    delay?: number,
}

type Props = BaseStageProps & {
    children: ReactElement<InputProps> | ReactElement<InputProps>[],
    title: string,
    icon: IconProp,
    moveLeft?: boolean
}

export function BaseStage(props: Props) {
    const formRef = createRef<HTMLFormElement>();

    const onNextClickHandler = () => {
        const valid = formRef.current?.checkValidity();
        if (valid) props.onNext();
    }
    return (
        <AnimatePresence exitBeforeEnter={true}>
            <Form title={props.title} icon={props.icon} moveLeft={props.moveLeft} ref={formRef}>
                <>{props.children}</>

                <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: STAGE_ANIMATION_DURATION - 0.5 }}>
                    <Button className="bg-darkGray" onClick={props.onPrev}>Previous</Button>
                    <Button className="bg-blue" onClick={onNextClickHandler}>Next</Button>
                </motion.div>

            </Form>
        </AnimatePresence>
    )

}