import React from 'react';
import { PatientChart } from 'nurse-o-core';
import AllergyCard from './Card/AllergyCard';
import FlagsCard from './Card/FlagsCard';
import HistoryCard from './Card/HistoryCard';
import ImmunizationCard from './Card/ImmunizationCard';
import SocialHistoryCard from './Card/SocialHistory';
import OrdersCard from './Card/OrdersCard';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default class Dashboard extends React.Component<Props> {

    
    public render() {
        return (
            <div className="grid grid-cols-4 mx-4">
                
                <FlagsCard className="col-span-1" flags={this.props.patient?.flags}></FlagsCard>
                <ImmunizationCard  className="col-span-1" immunizations={this.props.patient.immunizations} />
                <AllergyCard className='col-span-2' allergies={this.props.patient?.allergies}></AllergyCard>
                <OrdersCard  className="col-span-4" medications={[...this.props.patient.medicationOrders, ...this.props.patient.customOrders]} />
                {/* <MedicationCard className="col-span-4" medications={this.props.patient?.medicationOrders}></MedicationCard> */}
                <HistoryCard className="col-span-4" history={this.props.patient.medicalHistory} />
                <SocialHistoryCard className="col-span-4" history={this.props.patient.socialHistory} />
            </div>

        );
    }
}