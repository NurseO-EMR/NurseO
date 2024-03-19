import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseStage, BaseStageProps } from "../../Components/Stages/BaseStage";
import { Td } from "../../Components/Table/Td";
import { Tr } from "../../Components/Table/Tr";
import { LocationDefinition, Medication } from "nurse-o-core";
import { Database } from "../../Services/Database";

export type Props = BaseStageProps & {
    med: Medication

};

export function MedFinalizeStage(props: Props) {

    const [locations, setLocations] = useState<LocationDefinition[]>()
    const navigate = useNavigate()

    const onNextClickHandler = () => {
        navigate("/")
    }

    useEffect(() => {
        async function getLocations() {
            const db = Database.getInstance()
            const settings = await db.getSettings();
            setLocations(settings.locations);
        }
        getLocations();
    }, [])

    if (!locations) return <div>Loading...</div>
    else return <BaseStage {...props} title="Congratulations" icon={faFileInvoice} onNext={onNextClickHandler} customNextText="Go Home">
        <div>
            <h2>{props.med.genericName} ({props.med.brandName}) is now added in the following locations: </h2>
            <table className="my-3">
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
                    {props.med.locations.map((l, i) => {
                        const locationDef = find(locations, { id: l.id })
                        return <Tr key={i}>
                            {/* <span className="font-bold text-red">{locationDef?.building}-{locationDef?.station}-{l.drawer}-{l.slot} </span>
                            <span>{l.type} {l.dose} Barcode: {l.barcode}</span> */}
                            <Td>{locationDef?.building || ""}</Td>
                            <Td>{locationDef?.station || ""}</Td>
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