import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { BaseStage, type BaseStageProps } from "~/components/Admin/Stages/BaseStage";
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";
import type { Medication } from "@nurse-o-core/index";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

export type Props = BaseStageProps & {
    med: Medication

};

export function MedFinalizeStage(props: Props) {

    const { data } = api.medication.getMedDetails.useQuery({ id: props.med.id })
    const locations = data?.locations
    const router = useRouter()

    const onNextClickHandler = () => {
        router.push("/nurseo_admin")
    }

    if (!locations) return <div>Loading...</div>
    else return <BaseStage {...props} title="Congratulations" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home">
        <div>
            <h2>{props.med.genericName} ({props.med.brandName}) is now added in the following locations: </h2>
            <table className="my-3 w-full">
                <thead>
                    <Tr>
                        <th className="border px-2">Building</th>
                        <th className="border px-2">Station</th>
                        <th className="border px-2">Drawer</th>
                        <th className="border px-2">Slot</th>
                        <th className="border px-2">Type</th>
                        <th className="border px-2">Concentration</th>
                        <th className="border px-2">Barcode</th>
                    </Tr>
                </thead>
                <tbody>
                    {locations.map((l, i) => {
                        return <Tr key={i}>
                            <Td>{l.building}</Td>
                            <Td>{l.station}</Td>
                            <Td>{l.drawer}</Td>
                            <Td>{l.slot}</Td>
                            <Td>{l.type}</Td>
                            <Td>{l.dose}</Td>
                            <Td>{l.barcode}</Td>
                        </Tr>

                    })}
                </tbody>
            </table>

        </div>
    </BaseStage>
}