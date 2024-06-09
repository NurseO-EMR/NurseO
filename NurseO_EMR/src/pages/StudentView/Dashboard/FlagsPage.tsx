import React from 'react';
import FlagsCard from '../../../Components/Dashboard/Card/FlagsCard';
import { PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';

type Props =  {
    patient: PatientChart
}

export default class FlagsPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <FlagsCard flags={this.props.patient?.flags} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}