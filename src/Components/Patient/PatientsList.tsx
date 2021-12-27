import React from 'react';
import PureModal from "react-pure-modal";
import Database from '../../Services/Database';
import { PatientChart } from '../../Types/PatientProfile';
import Card from '../Dashboard/Card/Card';
import Button from '../Form/Button';
import CreatePatient from './CreatePatient/CreatePatient';


type Props = {}
type State = {
    patients: PatientChart[],
    showEdit: boolean,
    patientToBeEdited: PatientChart
}
export default class PatientList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            patients: [],
            showEdit: false,
            patientToBeEdited: new PatientChart()
        }
    }

    async componentDidMount() {
        await this.updatePatients();
    }

    async updatePatients() {
        const db = Database.getInstance();
        const patients = await db.getTemplatePatients();
        this.setState({
            patients
        })
    }

    async onDeleteClickHandler(patient: PatientChart) {
        const db = Database.getInstance();
        await db.deleteTemplatePatient(patient);
        await this.updatePatients();
    }

    onEditClickHandler(patient: PatientChart) {
        this.setState({
            showEdit: true,
            patientToBeEdited: patient
        })
    }

    async onPatientEdited(newPatient:PatientChart) {
        const db = Database.getInstance();
        await db.updateTemplatePatient(this.state.patientToBeEdited, newPatient);
        await this.updatePatients();
        this.setState({
            showEdit: false,
            patientToBeEdited: new PatientChart()
        })
    }

    public render() {
        return (
            <>
                <Card title='Patients' admin className='w-70vw block m-auto'>
                    <thead>
                        <tr>
                            <th>Barcode</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.patients.map((patient, i) =>
                            <tr key={i} className='odd:bg-gray-100 even:bg-gray-300 h-14 text-center'>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.dob}</td>
                                <td><Button className='bg-edit' onClick={() => this.onEditClickHandler(patient)}>Edit</Button></td>
                                <td><Button onClick={() => this.onDeleteClickHandler(patient)} admin>Delete</Button></td>
                            </tr>

                        )}
                    </tbody>
                </Card>


                <PureModal isOpen={this.state.showEdit} onClose={() => this.setState({ showEdit: false })} width="90vw">
                    <CreatePatient patient={this.state.patientToBeEdited} onSave={this.onPatientEdited.bind(this)}/>
                </PureModal>
            </>

        );
    }
}