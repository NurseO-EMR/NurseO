import React from 'react';
import ReportEditorSelector from '../../../Components/Reports/ReportEditor/ReportEditorSelector';
import AdminViewPage from '../AdminViewPage';

type Props = {

}

type State = {
    
}

export default class EditScalesPage extends React.Component<Props,State> {

    public render() {	
        return (
            <AdminViewPage selected="Edit Scales">
                <ReportEditorSelector reportType='studentScalesReport' />
            </AdminViewPage>

        );
    }	
}