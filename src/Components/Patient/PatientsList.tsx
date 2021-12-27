import React from 'react';
import Database from '../../Services/Database';
import { PatientChart } from '../../Types/PatientProfile';
import Card from '../Dashboard/Card/Card';
import Button from '../Form/Button';


type Props = {}
type State = {
    patients: PatientChart[]
}
export default class PatientList extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            patients: []
        }
    }
    
    async componentDidMount() {
        const db = Database.getInstance();
        const patients = await db.getTemplatePatients();
        this.setState({
            patients
        })
    }

    async onDeleteClickHandler(patient:PatientChart) {
        const db = Database.getInstance();
        await db.deleteTemplatePatient(patient);
        const patients = await db.getTemplatePatients();
        this.setState({patients});
    }

    onEditClickHandler() {
        
    }

    public render() {
        return (
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
                            <td><Button className='bg-edit'>Edit</Button></td>
                            <td><Button onClick={()=>this.onDeleteClickHandler(patient)}  admin>Delete</Button></td>
                        </tr>
                    
                    )}
                </tbody>
            </Card>

        );
    }
}