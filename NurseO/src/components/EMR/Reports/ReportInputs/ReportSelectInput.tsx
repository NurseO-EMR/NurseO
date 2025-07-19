import { useEffect, useState } from "react"
import { Input } from "~/components/common/ui/input"
import { Label } from "~/components/common/ui/label"
import { Select } from "~/components/common/ui/select"
import { type ReportField } from "~/core"

type Props = {
    className: string,
    id: string,
    disabled: boolean,
    onChange: (value: string) => void,
    field: ReportField
}

export function ReportSelectInput(props: Props) {
    const [showEmptyTextBox, setShowEmptyTextBox] = useState(false)
    const [emptyTextBoxValue, setEmptyTextBoxValue] = useState("")

    useEffect(() => {
        props.onChange(emptyTextBoxValue)
    }, [emptyTextBoxValue, props])

    const onChangeHandler = (value: string) => {
        if (value.includes("(X)")) {
            setShowEmptyTextBox(true)
        }
        else {
            setShowEmptyTextBox(false)
            props.onChange(value)
        }

    }


    if (props.field.labels?.length && props.field.labels.length > 0) {
        return (
            <div className={props.className}>
                <Label htmlFor={props.id} className="text-sm font-medium">{props.field.name}</Label>
                {props.field.labels?.map(l => (
                    <div key={`${props.field.name}-${l}`}>
                        <Label htmlFor={`${props.id}-${l}`} className="text-sm font-medium" aria-label={`${props.field.name} - ${l}`}>{l}</Label>
                        <Select id={`${props.id}-${l}`} disabled={props.disabled} onChange={onChangeHandler} >
                            <>
                                <option></option>
                                {props.field.options?.map((o, i) => <option value={o} key={o + i}>{o}</option>)}
                            </>
                        </Select>
                    </div>
                ))}
            </div>
        )
    } else return (
        <div className={props.className}>
            <Label htmlFor={props.id} className="text-sm font-medium">{props.field.name}</Label>
            <Select id={props.id} disabled={props.disabled} onChange={onChangeHandler} className="mt-6">
                <>
                    <option></option>
                    {props.field.options?.map((o, i) => <option value={o} key={o + i}>{o}</option>)}
                </>
            </Select>
            {showEmptyTextBox &&
                <div key={`${props.id}-emptyBox`} className="">
                    <Label htmlFor={`${props.id}-emptyBox`} className="text-sm font-medium">Explain</Label>
                    <Input id={`${props.id}-emptyBox`} disabled={props.disabled} aria-label={`${props.field.name} - Abnormal - Explain`} onChange={e => setEmptyTextBoxValue(e.currentTarget.value)} />
                </div>
            }
        </div>
    )
}

