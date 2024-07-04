import React from 'react';
import { type PatientChart } from '@nurse-o-core/index';
import AllergyCard from './Card/AllergyCard';
import FlagsCard from './Card/FlagsCard';
import HistoryCard from './Card/HistoryCard';
import ImmunizationCard from './Card/ImmunizationCard';
import SocialHistoryCard from './Card/SocialHistory';
import OrdersCard from './Card/OrdersCard';
import { DiagnosisCard } from './Card/DiagnosisCard';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default class Dashboard extends React.Component<Props> {

    
    public render() {
        return (
            <div className="grid grid-cols-4 mx-4">
                <DiagnosisCard className="col-span-2" diagnosis={this.props.patient.diagnosis} />
                <FlagsCard className="col-span-1" flags={this.props.patient?.flags}></FlagsCard>
                <ImmunizationCard  className="col-span-1" immunizations={this.props.patient.immunizations} />
                <HistoryCard className="col-span-3" history={this.props.patient.medicalHistory} />
                <AllergyCard className='col-span-1' allergies={this.props.patient?.allergies}></AllergyCard>
                <OrdersCard  className="col-span-4" medications={[ ...this.props.patient.customOrders, ...this.props.patient.medicationOrders]} />
                {/* <MedicationCard className="col-span-4" medications={this.props.patient?.medicationOrders}></MedicationCard> */}
                
                <SocialHistoryCard className="col-span-4" history={this.props.patient.socialHistory} />
            </div>

        );
    }
}