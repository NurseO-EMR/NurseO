import React from 'react';
import { PatientChart } from '../../Types/PatientProfile';
import AllergyCard from './Card/AllergyCard';
import FlagsCard from './Card/FlagsCard';
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
            </div>

        );
    }
}