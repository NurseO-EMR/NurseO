import React from 'react';
import AdminsList from '../../../Components/Admin/AdminsList';
import AdminViewPage from '../AdminViewPage';

export default class EditAdminsPage extends React.Component {

    public render() {	
        return (
            <AdminViewPage selected='Add/Remove Admins'>
                <AdminsList />
            </AdminViewPage>

        );
    }	
}