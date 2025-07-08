import { Label } from "~/components/common/ui/label";
import { type ReportSet, type ReportField } from "~/core"
import { Input } from "~/components/common/ui/input"
import { Select } from "~/components/common/ui/select";
import { Checkbox } from "~/components/common/ui/checkbox";

type Props = {
    set: ReportSet
    field: ReportField
}
export function ReportDynamicInput(props: Props) {
    const { set, field } = props;
    const id = `${set.name}-${field.name}`
    const className = "grid grid-cols-4 py-3 items-center even:bg-gray-200 w-full pl-10"
    if (props.field.fieldType === "text") {
        return (
            <div key={id} className={className}>
                <Label htmlFor={id} className="text-sm font-medium">{field.name}</Label>
                <Input id={id} />
            </div>
        )
    } else if (field.fieldType === "options" && field.options) {
        return (
            <div className={className}>
                <Label htmlFor={id} className="text-sm font-medium">{field.name}</Label>
                <Select id={id} onChange={console.log} value="s" >
                    <>
                        <option></option>
                        {field.options.map(o => <option value={o} key={o}>{o}</option>)}
                    </>
                </Select>
            </div>

        )
    } else if (field.fieldType === "checkbox") {
        return (
            <div className={className}>
                <Label className="text-sm font-medium">{field.name}</Label>
                <div className="flex items-start w-full flex-wrap gap-x-10 gap-y-10 col-span-3 pr-48">
                    {field.options?.map(o => (
                        <div key={o} className="flex items-center space-x-2">
                            <Checkbox id={`${id}-${o}`} />
                            <Label htmlFor={`${id}-${o}`} className="text-sm">{o}</Label>
                        </div>
                    ))}

                </div>
            </div>
        )
    } else if (props.field.fieldType === "number") {
        return (
            <div key={id} className={className}>
                <Label htmlFor={id} className="text-sm font-medium">{field.name}</Label>
                <Input id={id} type="number" />
            </div>
        )
    } else if (props.field.fieldType === "T/F") {
        return (
            <div className={className}>
                <Label htmlFor={id} className="text-sm font-medium">{field.name}</Label>
                <Select id={id} onChange={console.log} value="s" >
                    <>
                        <option></option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </>
                </Select>
            </div>
        )
    } else {
        return <div>ERROR - {field.fieldType}</div>
    }
}