import React from 'react';
import Mar from '../../Components/Mar/Mar';
import { PatientChart } from '../../Types/PatientProfile';
import StudentViewPage from './StudentViewPage';

type Props = {
    patient: PatientChart
}

export default class MARPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <Mar medications={this.props.patient!.medications}></Mar>
            </StudentViewPage>
        );
    }
}