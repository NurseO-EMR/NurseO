import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/common/ui/button"
import { Input } from "~/components/common/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/common/ui/dialog"
import { api } from "~/utils/api"
import { Badge } from "~/components/common/ui/badge"

type ICD10Code = {
    code?: string
    description?: string
}

type Props = {
    onChange: (value: ICD10Code) => void
    value: ICD10Code | undefined
    className?: string
}


export function ICD10SearchBox(props: Props) {
    const getICD10CodesMutation = api.grad.getICD10CodeByDescription.useMutation()
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filteredCodes, setFilteredCodes] = useState<ICD10Code[]>([])

    useEffect(() => {
        setSearchTerm(props.value?.code ? `${props.value?.code} - ${props.value?.description}` : "")
    }, [props.value])

    const handleSearchClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsDialogOpen(true)
        if (searchTerm.length === 0) {
            setFilteredCodes([])
            return
        }
        const codes = await getICD10CodesMutation.mutateAsync({ description: searchTerm })
        setFilteredCodes([...codes.data ?? []])
    }

    const handleCodeSelect = (code: ICD10Code) => {
        setSearchTerm(`${code.code} - ${code.description}`)
        setIsDialogOpen(false)
        props.onChange(code)

    }

    return (
        <div className={cn("w-full", props.className)}>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input {...props} type="text" placeholder={"Type keywords like 'fatigue' or 'hypertension' then click on 'search'"} value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleSearchClick} className="px-4" role="button"><Search className="h-4 w-4 mr-2" />Search</Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-2xl">
                    <DialogHeader>
                        <DialogTitle>Select ICD10 Code</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="text-sm">
                            {getICD10CodesMutation.isPending ? "Loading... " : ""}
                            {searchTerm.length > 0
                                ? filteredCodes.length > 0
                                    ? `Found ${filteredCodes.length} matching code${filteredCodes.length === 1 ? "" : "s"} for "${searchTerm}"`
                                    : `No matching codes found for "${searchTerm}"`
                                : `Please type in a search keyword item`}
                        </div>


                        <div className="space-y-2 overflow-scroll" style={{ height: "60vh" }}>
                            {filteredCodes.map((code) => (
                                <div key={code.code} onClick={() => handleCodeSelect(code)}
                                    className="p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors ">
                                    <div className="flex gap-4 items-center">
                                        <Badge className="min-w-20">{code.code}</Badge>
                                        <div className="flex-1">
                                            <p className="text-sm leading-relaxed">{code.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
