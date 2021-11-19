import React from 'react';
import WriteNote from '../../../Components/Notes/WriteNote';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart     
}

export default class WriteNotePage extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <WriteNote />
            </StudentViewPage>

        );
    }	
}