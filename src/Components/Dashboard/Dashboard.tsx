import React from 'react';
import { PatientChart } from '../../Types/PatientProfile';
import AllergyCard from './Card/AllergyCard';
import FlagsCard from './Card/FlagsCard';
import MedicationCard from './Card/MedicationCard';
import NotesCard from './Card/NotesCard';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default class Dashboard extends React.Component<Props> {

    
    public render() {
        return (
            <div className="grid grid-cols-4 mx-4 gap-3">
                <MedicationCard className="col-span-3" medications={this.props.patient?.medications}></MedicationCard>
                <AllergyCard allergies={this.props.patient?.allergies}></AllergyCard>
                <NotesCard className="col-span-2" notes={this.props.patient?.notes}></NotesCard>
                <FlagsCard className="col-span-2" flags={this.props.patient?.flags}></FlagsCard>
            </div>

        );
    }
}