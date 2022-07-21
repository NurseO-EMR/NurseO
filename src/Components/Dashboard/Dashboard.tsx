import React from 'react';
import { PatientChart } from 'nurse-o-core';
import AllergyCard from './Card/AllergyCard';
import FlagsCard from './Card/FlagsCard';
import HistoryCard from './Card/HistoryCard';
import ImmunizationCard from './Card/ImmunizationCard';
import MedicationCard from './Card/MedicationCard';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default class Dashboard extends React.Component<Props> {

    
    public render() {
        return (
            <div className="grid grid-cols-4 mx-4">
                <MedicationCard className="col-span-3" medications={this.props.patient?.medicationOrders}></MedicationCard>
                <AllergyCard allergies={this.props.patient?.allergies}></AllergyCard>
                <FlagsCard className="col-span-2" flags={this.props.patient?.flags}></FlagsCard>
                <ImmunizationCard  className="col-span-2" immunizations={this.props.patient.immunizations} />
                <HistoryCard className="col-span-4" history={this.props.patient.medicalHistory} />
            </div>

        );
    }
}