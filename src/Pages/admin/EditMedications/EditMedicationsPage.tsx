import React from 'react';
import MedList from '../../../Components/Orders/Edit/MedList';
import AdminViewPage from '../AdminViewPage';

export default class EditMedicationsPage extends React.Component {

    public render() {	
return (
    <AdminViewPage selected='Edit Medications'>
        <MedList />
    </AdminViewPage>

);
    }	
}