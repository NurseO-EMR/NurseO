import { useContext, useRef, useState } from 'react';
import PureModal from 'react-pure-modal';
import { Frequency, type Medication, type MedicationOrder, OrderKind, OrderType, Routine } from "@nurse-o-core/index";
import EmptyCard from '../Dashboard/Card/EmptyCard';
import { api } from '~/utils/api';
import { GlobalContext } from '~/Services/State';
import { useRouter } from 'next/navigation';
import { signInState } from '~/types/flags';


export default function AdministerMeds() {
    const ref = useRef<HTMLInputElement>(null)
    const [medicationBarcode, setMedicationBarcode] = useState("")
    const [medication, setMedication] = useState<Medication | null>(null)
    const [orderIndex, setOrderIndex] = useState(-1)
    const [dose, setDose] = useState("")
    const [medicationNotFound, setMedicationNotFound] = useState(false)
    const getMedicationByBarcode = api.medication.getMedicationByBarcode.useMutation()
    const addMarEntry = api.medication.addMarEntry.useMutation()
    const addMarWithNoOrder = api.medication.addMarWithNoOrder.useMutation()
    const { patient, setPatient, locationId, studentId } = useContext(GlobalContext)
    const router = useRouter()


    const onScanHandler = async () => {
        const orderInfo = await getOrderByMedBarCode(medicationBarcode);

        if (orderInfo.orderIndex > -1) {
            setMedication(orderInfo.med)
            setOrderIndex(orderInfo.orderIndex)
        } else if (orderInfo.med) {
            setMedication(orderInfo.med)
            setOrderIndex(-1)
        } else {
            setMedicationNotFound(true)
        }
    }

    const onSubmit = async () => {
        const tempPatient = { ...patient }
        const { hour, minute } = patient.time;
        tempPatient.medicationOrders[orderIndex]?.mar.push({ hour, minute, dose })
        const userSignedIn = studentId !== signInState.anonymousSignIn.valueOf()


        /*
            the first if is if we have the order already 
            the second if is if we are adding a new order for that medication
        */

        if (orderIndex > -1 && patient.medicationOrders[orderIndex]) {
            const orderId = patient.medicationOrders[orderIndex]!.orderId // checked in the above if statement 
            if(userSignedIn) await addMarEntry.mutateAsync({ orderId, dose, hour, minute })
            tempPatient.medicationOrders[orderIndex]!.mar.push({dose, hour, minute}) // checked in the above if statement 
        } else if (medication) {
            let orderId = -1
            if (userSignedIn) orderId = (await addMarWithNoOrder.mutateAsync({ medId: medication.id, dose, hour, minute, patientId: tempPatient.dbId })).orderId
            const order = createEmptyOrder(medication.id, orderId)
            tempPatient.medicationOrders.push(order)
            tempPatient.medicationOrders[tempPatient.medicationOrders.length -1]?.mar.push({dose,hour,minute})
        } 

        setPatient(tempPatient)

        resetState()
        router.push("/StudentView/Mar")
    }

    const resetState = () => {
        setMedication(null)
        setMedicationNotFound(false)
        setMedicationBarcode("")
        setOrderIndex(-1)
        ref.current?.focus()
    }

    const getOrderByMedBarCode = async (barcode: string) => {
        const med = await getMedicationByBarcode.mutateAsync({ barcode, locationId })
        if (!med) return { orderIndex: -1, med: null }
        const orderIndex = patient.medicationOrders.findIndex(m => m.id === med.id)
        return { orderIndex, med }
    }


    const order = patient.medicationOrders[orderIndex]
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

            <PureModal isOpen={!!(medication?.genericName ?? medication?.brandName)} header={`Administer ${medication?.genericName ?? medication?.brandName}`}
                draggable={true} onClose={resetState} className="text-center" width="60vw">
                <form onSubmit={e => e.preventDefault()}>
                    <h1 className="font-bold text-xl py-6">
                        {medication?.genericName ?? medication?.brandName}{" "}
                        {order?.concentration}{" "}
                        {order?.route}{" "}
                        {order?.frequency} {" "}
                        {order?.routine}  {" "}
                        {order?.PRNNote}{" "}
                        {order?.notes}{" "}
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
                onClose={resetState} className="text-center" width="60vw">
                <h1>The medication was not found please try again or verify that you have the right medication</h1>
            </PureModal>

        </>
    );
}



function createEmptyOrder(medId: number, orderId: number): MedicationOrder {
    return {
        id: medId,
        concentration: "",
        frequency: Frequency.NA,
        mar: [],
        notes: "",
        orderId: orderId,
        orderKind: OrderKind.NA,
        orderType: OrderType.NA,
        PRNNote: "",
        route: "",
        routine: Routine.NA,
        completed: false,
        holdReason: null,
        time: "",
        orderIndex: -1
    }
}