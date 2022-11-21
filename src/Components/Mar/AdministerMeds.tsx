import { findIndex } from 'lodash';
import { useRef, useState } from 'react';
import PureModal from 'react-pure-modal';
import Database from '../../Services/Database';
import { $patient } from '../../Services/State';
import { Frequency, MedicationOrder, OrderKind, OrderType, PatientChart, Routine } from 'nurse-o-core';
import EmptyCard from '../Dashboard/Card/EmptyCard';

type Props = {
    patient: PatientChart
}

export default function AdministerMeds(props: Props) {
    const ref = useRef<HTMLInputElement>(null)
    const [medicationBarcode, setMedicationBarcode] = useState("")
    const [scannedMedicationOrder, setScannedMedicationOrder] = useState<MedicationOrder | undefined>(undefined)
    const [scannedMedicationName, setScannedMedicationName] = useState("")
    const [dose, setDose] = useState("")
    const [medicationNotFound, setMedicationNotFound] = useState(false)


    const onScanHandler = async () => {
        const db = Database.getInstance();
        const patient = $patient.value;
        let medications = patient!.medicationOrders;
        const medIndex = await getMedIndex(medications);
        if (medIndex > -1) {
            const med = await db.getMedicationById(patient!.medicationOrders[medIndex].id);
            setScannedMedicationOrder(patient?.medicationOrders[medIndex])
            if (med) setScannedMedicationName(med.genericName || med.brandName || "")
        } else {
            setMedicationNotFound(true)
        }

    }

    const onSubmit = async () => {
        const db = Database.getInstance();
        const patient = $patient.value!;
        const medications = patient.medicationOrders;
        const medIndex = await getMedIndex(medications)
        if (medIndex > -1) {
            const { hour, minutes } = patient.time;
            patient.medicationOrders[medIndex].mar.push({ hour, minutes })
            $patient.next(patient);
            await db.updatePatient()
            setMedicationBarcode("")
            setScannedMedicationName("")
            setScannedMedicationOrder(undefined)
            setDose("")
        }
    }

    const onModalClose = () => {
        setScannedMedicationOrder(undefined)
        setScannedMedicationName("")
        setMedicationNotFound(false)
        setMedicationBarcode("")
        ref.current?.focus()
    }

    const getMedIndex = async (medicationOrders: MedicationOrder[]) => {
        const db = Database.getInstance();
        const med = await db.getMedicationByBarcode(medicationBarcode)
        const medID = med?.id;
        const orderIndex = findIndex(medicationOrders, { id: medID });
        if (orderIndex > -1) return orderIndex
        else if (med) {
            const order: MedicationOrder = {
                id: med.id,
                concentration: "",
                frequency: Frequency.NA,
                mar: [],
                notes: "",
                orderKind: OrderKind.NA,
                orderType: OrderType.NA,
                PRNNote: "",
                route: "",
                routine: Routine.NA,
            }
            medicationOrders.push(order)
            $patient.value.medicationOrders = medicationOrders;
            $patient.next($patient.value)
            return medicationOrders.length - 1
        }
        else return -1;
    }


    return (
        <>
            <EmptyCard title="Administer Medications" className="text-center">
                <form onSubmit={e => e.preventDefault()}>
                    <h1 className="font-bold p-10 text-4xl">
                        Please scan the medication you wish to administer
                    </h1>
                    <input type="text" className="border-primary border-2 rounded-full w-1/2 h-10 block mx-auto text-center"
                        placeholder="click here to scan the medication barcode" autoFocus
                        onChange={e => setMedicationBarcode(e.target.value)}
                        value={medicationBarcode} ref={ref} />
                    <button className="text-white bg-primary px-20 py-2 rounded-full mt-5"
                        onClick={onScanHandler}>Administer</button>
                </form>
            </EmptyCard>

            <PureModal isOpen={!!scannedMedicationName} header={`Administer ${scannedMedicationName}`}
                draggable={true} onClose={onModalClose} className="text-center" width="60vw">
                <form onSubmit={e => e.preventDefault()}>
                    <h1 className="font-bold text-xl py-6">
                        {scannedMedicationName}{" "}
                        {scannedMedicationOrder?.concentration}{" "}
                        {scannedMedicationOrder?.route}{" "}
                        {scannedMedicationOrder?.frequency} {" "}
                        {scannedMedicationOrder?.routine}  {" "}
                        {scannedMedicationOrder?.PRNNote}{" "}
                        {scannedMedicationOrder?.notes}{" "}
                    </h1>
                    <div>
                        <label className="block text-primary font-bold text-lg tracking-wide pb-4" htmlFor="dose">
                            Please State your dose or rate with units (ex: 100ml/hr or 20mg)
                        </label>
                        <input className="border-2 border-primary rounded-full text-center h-10 w-1/2 mb-4"
                            onChange={e => setDose(e.target.value)} value={dose}
                            autoFocus type="text" id="dose" placeholder="Dose or Rate" />
                    </div>
                    <button className="bg-primary text-white py-4 px-16 rounded-full font-bold" onClick={onSubmit}>Submit</button>
                </form>
            </PureModal>

            <PureModal isOpen={medicationNotFound} header="Medication Not Founded"
                onClose={onModalClose} className="text-center" width="60vw">
                <h1>The medication was not found please try again or verify that you have the right medication</h1>
            </PureModal>

        </>
    );
}



