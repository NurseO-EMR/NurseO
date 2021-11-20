import React from 'react';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}
export default class ProviderOrdersPage extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <h1>Bye</h1>
            </StudentViewPage>

        );
    }	
}