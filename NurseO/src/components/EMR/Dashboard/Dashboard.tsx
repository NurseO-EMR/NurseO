import React from 'react';
import { OrderType, type PatientChart } from '~/core/index';
import AllergyCard from './Card/AllergyCard';
import FlagsCard from './Card/FlagsCard';
import HistoryCard from './Card/HistoryCard';
import ImmunizationCard from './Card/ImmunizationCard';
import SocialHistoryCard from './Card/SocialHistory';
import { DiagnosisCard } from './Card/DiagnosisCard';
import { ChiefComplaintCard } from './Card/ChiefComplaint';
import Orders from '../Orders/Orders';
import NotesCard from './Card/NotesCard';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    patient: PatientChart
}

export default function Dashboard(props: Props) {


    return (
        <div className="grid grid-cols-4 mx-4">
            <DiagnosisCard className="col-span-2" diagnosis={props.patient.diagnosis} />
            <ChiefComplaintCard className='col-span-2' chiefComplaint={props.patient.chiefComplaint} />
            <FlagsCard className="col-span-1" flags={props.patient?.flags}></FlagsCard>
            <ImmunizationCard className="col-span-2" immunizations={props.patient.immunizations} />
            <SocialHistoryCard className="col-span-1" history={props.patient.socialHistory} />
            <HistoryCard className="col-span-3" history={props.patient.medicalHistory} />
            <AllergyCard className='col-span-1' allergies={props.patient?.allergies}></AllergyCard>
            {<Orders className='col-span-4' orderType={OrderType.admission} orders={[...props.patient.customOrders, ...props.patient.medicationOrders]} />}
            {<Orders className='col-span-4' orderType={OrderType.protocol} orders={[...props.patient.customOrders, ...props.patient.medicationOrders]} />}
            {<Orders className='col-span-4' orderType={OrderType.standing} orders={[...props.patient.customOrders, ...props.patient.medicationOrders]} />}
            {<Orders className='col-span-4' orderType={OrderType.provider} orders={[...props.patient.customOrders, ...props.patient.medicationOrders]} />}
            <NotesCard className='col-span-4' notes={props.patient.notes} />
        </div>

    );
}