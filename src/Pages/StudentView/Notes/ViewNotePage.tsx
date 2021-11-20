import React from 'react';
import NotesCard from '../../../Components/Dashboard/Card/NotesCard';
import { PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}
export default class ViewNotePage extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <NotesCard notes={this.props.patient?.notes}></NotesCard>
            </StudentViewPage>

        );
    }	
}