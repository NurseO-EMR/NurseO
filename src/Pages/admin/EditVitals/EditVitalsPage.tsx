import React from 'react';
import ReportEditorSelector from '../../../Components/Reports/ReportEditor/ReportEditorSelector';
import AdminViewPage from '../AdminViewPage';

type Props = {

}

type State = {
    
}

export default class EditVitalsPage extends React.Component<Props,State> {

    public render() {	
        return (
            <AdminViewPage selected="Edit Vitals">
                <ReportEditorSelector reportType='studentVitalsReport' />
            </AdminViewPage>

        );
    }	
}