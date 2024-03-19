import React from 'react';
import AllergyCard from '../../../Components/Dashboard/Card/AllergyCard';
import { PatientChart } from 'nurse-o-core';
import StudentViewPage from '../StudentViewPage';

type Props =  {
    patient: PatientChart
}

export default class AllergiesPage extends React.Component<Props> {



    public render() {
        return (
            <StudentViewPage patient={this.props.patient}>
                <AllergyCard allergies={this.props.patient?.allergies} className="grid-in-main" />
            </StudentViewPage>
        );
    }
}