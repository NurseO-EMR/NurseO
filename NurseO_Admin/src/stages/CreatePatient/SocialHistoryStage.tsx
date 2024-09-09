import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { type PatientChart } from "@nurse-o-core/index";
import { useState } from "react";
import { useFocus } from "~/components/Admin/customHooks";
import { Button } from "~/components/Admin/Form/Button";
import { Input } from "~/components/Admin/Form/Input";
import { ArrayPreviewer } from "~/components/Admin/Stages/ArrayPreviewer";
import { type BaseStageProps, BaseStage } from "~/components/Admin/Stages/BaseStage"
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";

export type Props = BaseStageProps & {
    onNext: (socialHistory: string[]) => void,
    patient?: PatientChart
}

export function SocialHistoryStage(props: Props) {
    const [inputRef, setInputFocus] = useFocus()
    const [history, setHistory] = useState(props.patient?.socialHistory ?? [] as string[]);

    const [entry, setEntry] = useState("");


    const onHistoryAddClickHandler = () => {
        history.push(entry)
        setHistory([...history]);
        setEntry("");
        setInputFocus();
    }


    const onNextClickHandler = () => {
        props.onNext(history)
    }


    const onDeleteClickHandler = (index: number) => {
        history.splice(index, 1)
        setHistory([...history]);
    }

    return (
        <div className="overflow-hidden relative">
            <BaseStage {...props} onNext={onNextClickHandler} title="Social History" icon={faBookMedical} moveLeft={history.length > 0}>
                <Input label="Entry" onChange={e => setEntry(e.currentTarget.value)} value={entry} ref={inputRef} optional />

                <Button onClick={onHistoryAddClickHandler} className="bg-blue my-4">Add Social History Entry</Button>
            </BaseStage>

            <ArrayPreviewer headerItems={["Entry", "Delete"]} show={history.length > 0} title="Added History">
                {history.map((entry, i) =>
                    <Tr key={i}>
                        <Td>{entry}</Td>
                        <Td>
                            <button className="bg-red w-full h-10 text-white font-bold"
                                onClick={() => onDeleteClickHandler(i)}>Delete</button>
                        </Td>
                    </Tr>
                )}
            </ArrayPreviewer>

        </div>
    )

}