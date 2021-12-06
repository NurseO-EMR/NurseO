import React from 'react';
import CreatePatient from '../../../Components/Patient/CreatePatient/CreatePatient';
import AdminViewPage from '../AdminViewPage';

export default class CreatePatientPage extends React.Component {

    public render() {	
        return (
            <AdminViewPage selected="Create Patient">
                <CreatePatient></CreatePatient>
            </AdminViewPage>

        );
    }	
}