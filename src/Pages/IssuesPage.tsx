import { groupBy } from "lodash";
import { Card } from "../Components/Card";
import { Td } from "../Components/Table/Td";
import { Tr } from "../Components/Table/Tr";
import { checkMeds } from "../Services/AutoChecker/MedsAutoChecker";
import { checkPatients } from "../Services/AutoChecker/PatientChecker";
import { Cache } from "../Services/Cache";
import PageView from "./PageView";

export function IssuesPage() {
    const cache = Cache.getInstance()
    const medsWIssues = checkMeds(cache.getMeds())
    const groupedMeds = groupBy(medsWIssues, "barcode")

    const patientsWIssues = groupBy(checkPatients(), "barcode")


    return <PageView>
        <Card>
            <h1 className="font-bold mb-4 text-center text-red text-2xl">Medication Issues</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border">Barcode</th>
                        <th>Found in the following medications</th>
                    </Tr>
                </thead>
                <tbody>
                    {Object.entries(groupedMeds).map(([barcode, meds], i) =>
                        <Tr key={i}>
                            <Td>{barcode}</Td>
                            <Td>
                                {meds.map((m, j) => <span  className="block" key={j}>{m.med.genericName} </span>)}
                            </Td>
                        </Tr>
                    )}
                </tbody>
            </table>
            <h1 className="font-bold my-4 text-center text-red text-2xl">Patient Issues</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border">Barcode</th>
                        <th>Found in the following medications</th>
                    </Tr>
                </thead>
                <tbody>
                    {Object.entries(patientsWIssues).map(([barcode, patients], i) =>
                        <Tr key={i}>
                            <Td>{barcode}</Td>
                            <Td>
                                {patients.map((p, j) => <span className="block" key={j}>{p.patient.name} </span>)}
                            </Td>
                        </Tr>
                    )}
                </tbody>
            </table>

        </Card>

    </PageView>
}