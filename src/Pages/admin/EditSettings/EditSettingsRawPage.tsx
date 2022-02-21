import React from 'react';
import RawSettings from '../../../Components/Admin/RawSettings';
import AdminViewPage from '../AdminViewPage';

export default class EditSettingsRawPage extends React.Component {

    public render() {
        return (
            <AdminViewPage selected="Edit Settings Raw">
                <RawSettings />
            </AdminViewPage>

        );
    }
}