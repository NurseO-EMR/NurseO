import { AnimatePresence, motion } from "framer-motion"
import type { ReactElement } from "react"
import { Form } from "../Form/Form"
import { Button } from "../Form/Button";
import type { Props as InputProps } from "~/components/Admin/Form/Input";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { STAGE_ANIMATION_DURATION } from "~/services/AnimationConfig";

export type BaseStageProps = {
    // onNext: () => void, // show be part of the lower classes
    onPrev: () => void,
    delay?: number,
}

type Props = BaseStageProps & {
    onNext: () => void,
    children: ReactElement<InputProps> | ReactElement<InputProps>[],
    title: string,
    icon: IconProp,
    moveLeft?: boolean,
    customIconNTitle?: boolean,
    customNextText?: string,
    hideBackButton?: boolean
}

export function BaseStage(props: Props) {
    let formInputsValid = false

    const onNextClickHandler = () => {
        //The formInputsValid is always lagging behind because the onClick event gets fired before the onSubmit event
        //and therefor the onClickHandler fires before the formInputValid variable gets set. So I am moving the 
        //execution to the end of the stack so the formInputsValid variable gets set first by wrapping with setTimeout. 
        setTimeout(() => {
            if (formInputsValid) props.onNext();
        }, 0);
    }

    return (
        <AnimatePresence mode="wait">
            <Form title={props.title} icon={props.icon} moveLeft={props.moveLeft} onValid={(valid) => formInputsValid = valid} customIconNTitle={props.customIconNTitle}>
                <>{props.children}</>

                <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: STAGE_ANIMATION_DURATION - 0.5 }}>
                    {!props.hideBackButton ? <Button className="bg-darkGray rounded-full" onClick={props.onPrev}>Previous</Button> : null}
                    <Button className="bg-blue rounded-full" onClick={onNextClickHandler}>{props.customNextText ? props.customNextText : "Next"}</Button>
                </motion.div>

            </Form>
        </AnimatePresence>
    )

}