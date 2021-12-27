import React from 'react';
import PatientList from '../../../Components/Patient/PatientsList';
import AdminViewPage from '../AdminViewPage';

export default class ViewPatientsPage extends React.Component {

    public render() {	
        return (
            <AdminViewPage selected='View Patients'>
                <PatientList></PatientList>
            </AdminViewPage>

        );
    }	
}