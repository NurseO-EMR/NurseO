

import { Input } from "~/components/common/ui/input"
import { Label } from "~/components/common/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common/ui/tabs"
import { Button } from "~/components/common/ui/button"
import { EmptyCard } from "~/components/Med/EmptyCard"
import { api } from "~/utils/api"
import { type ReportType } from "~/core"
import { ReportDynamicInput } from "./ReportDynamicInput"

type Props = React.HTMLAttributes<HTMLDivElement> & {
    reportType: ReportType,
    title: string,
    viewPageURL: string
}

export default function ReportsSubmitter(props: Props) {

    const { data: reportSets } = api.emr.student_getReportSets.useQuery({ reportType: props.reportType })
    return (
        <EmptyCard title={props.title}>

            <div className="flex justify-between px-10 py-10 items-center">
                <div className="flex gap-10 items-center">
                    <Label htmlFor="formDate" className="text-sm font-medium">Date</Label>
                    <Input id="formDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} className="w-full" />
                </div>
                <Button onClick={console.log} className="bg-primary hover:*:first-letter:bg-primary/90 text-white px-6 py-2">Save</Button>
            </div>

            <div>
                <Tabs defaultValue={reportSets?.[0]?.name} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto" role="tablist">
                        {reportSets?.map((set) => (
                            <TabsTrigger key={set.name} value={set.name} role="tab" aria-controls={`${set.name}-panel`} className="text-xs p-2">{set.name}</TabsTrigger>
                        ))}
                    </TabsList>

                    {reportSets?.map((set) => (
                        <TabsContent value={set.name} id={`${set.name}-panel`} role="tabpanel" className="mt-6" key={set.name}>
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    {set.reportFields.map((field) => <ReportDynamicInput field={field} set={set} key={set.name} />)}
                                </div>
                            </div>
                        </TabsContent>
                    ))}


                </Tabs>
            </div>
        </EmptyCard>
    )
}
