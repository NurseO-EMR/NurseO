import { findIndex } from 'lodash';
import React, { ChangeEvent } from 'react';
import PureModal from 'react-pure-modal';
import { filter } from 'lodash';
import Database from '../../Services/Database';
import { $patient, $providerOrdersAvailable } from '../../Services/State';
import { MedicationOrder, OrderType, PatientChart } from '../../Types/PatientProfile';
import EmptyCard from '../Dashboard/Card/EmptyCard';

type Props = {
    patient: PatientChart
}

type State = {
    medicationBarcode: string
    scannedMedicationOrder: MedicationOrder | undefined
    scannedMedicationName: string,
    dose: string,
    medicationNotFound: boolean,
}
export default class AdministerMeds extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            medicationBarcode: "",
            scannedMedicationOrder: undefined,
            scannedMedicationName: "",
            dose: "",
            medicationNotFound: false
        }
    }

    onIDChangeHandler(event:ChangeEvent<HTMLInputElement>) {
        this.setState({
            medicationBarcode: event.target.value
        })
    }

    onDoseChangeHandler(event:ChangeEvent<HTMLInputElement>) {
        this.setState({
            dose: event.target.value
        })
    }

    async onScanHandler() {
        const db = Database.getInstance();
        const patient = $patient.value;
        let medications = patient!.medicationOrders;
        if(!$providerOrdersAvailable.value) medications = filter(medications, order=> order.orderType !== OrderType.provider)
        const medIndex = await this.getMedIndex(medications);
        if(medIndex>-1) {
            const med = await db.getMedication(patient!.medicationOrders[medIndex].id);
            this.setState({
                scannedMedicationOrder: patient?.medicationOrders[medIndex],
                scannedMedicationName:med!.name
            });
        } else {
            this.setState({
                medicationNotFound: true
            })
        }
        
    }

    async onSubmit() {
        const db = Database.getInstance();
        const patient = $patient.value!;
        const medications = patient.medicationOrders;
        const medIndex = await this.getMedIndex(medications)
        if(medIndex>-1) {
            const {hour,minutes} = patient.time;
            patient.medicationOrders[medIndex].mar.push({hour, minutes})
            $patient.next(patient);
            await db.updatePatient()
            this.setState({
                medicationBarcode: "",
                scannedMedicationName: "",
                scannedMedicationOrder: undefined,
                dose: "",
            })
        }
    }

    onModalClose() {
        this.setState({
            scannedMedicationOrder: undefined,
            scannedMedicationName: "",
            medicationNotFound: false
        })
    }

    async getMedIndex(medicationOrders:MedicationOrder[]) {
        const db = Database.getInstance();
        const med = await db.getMedication(undefined, this.state.medicationBarcode)
        const medID = med?.id;
        return findIndex(medicationOrders, {id: medID});
    }

    public render() {
        return (
            <>
                <EmptyCard title="Administer Medications" className="text-center">
                    <h1 className="font-bold p-10 text-4xl">
                        Please scan the medication you wish to administer
                    </h1>
                    <input type="text" className="border-primary border-2 rounded-full w-1/2 h-10 block mx-auto text-center"
                    placeholder="click here to scan the medication barcode" autoFocus onChange={this.onIDChangeHandler.bind(this)}
                     value={this.state.medicationBarcode}/>
                    <button className="text-white bg-primary px-20 py-2 rounded-full mt-5" 
                    onClick={this.onScanHandler.bind(this)}>Administer</button>
                </EmptyCard>

                <PureModal isOpen={!!this.state.scannedMedicationName} header={`Administer ${this.state.scannedMedicationName}`}
                 draggable={true} onClose={this.onModalClose.bind(this)} className="text-center" width="60vw">
                     <div>
                        <h1 className="font-bold text-xl py-6">
                            {this.state.scannedMedicationName}{" "}
                            {this.state.scannedMedicationOrder?.concentration}{" "}
                            {this.state.scannedMedicationOrder?.route}{" "}
                            {this.state.scannedMedicationOrder?.frequency} {" "}
                            {this.state.scannedMedicationOrder?.routine}  {" "}
                            {this.state.scannedMedicationOrder?.PRNNote}{" "}
                            {this.state.scannedMedicationOrder?.notes}{" "}
                        </h1>
                        <div>
                            <label className="block text-primary font-bold text-lg tracking-wide pb-4" htmlFor="dose">
                                Please State your dose or rate with unites (ex: 100ml/hr or 20mg)
                            </label>
                            <input className="border-2 border-primary rounded-full text-center h-10 w-1/2 mb-4" onChange={this.onDoseChangeHandler.bind(this)}
                             autoFocus type="text" id="dose" placeholder="Dose or Rate" />
                        </div>
                        <button className="bg-primary text-white py-4 px-16 rounded-full font-bold" onClick={this.onSubmit.bind(this)}>Submit</button>
                    </div>
                </PureModal>

                <PureModal isOpen={this.state.medicationNotFound} header="Medication Not Founded" 
                    onClose={this.onModalClose.bind(this)} className="text-center" width="60vw">
                        <h1>The medication was not found please try again or verify that you have the right medication</h1>
                    </PureModal>

            </>
        );
    }
}


