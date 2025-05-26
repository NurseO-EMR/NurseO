import React, { useContext } from 'react';
import { OrderKind } from '~/core/index';
import AllergyCard from '~/components/EMR/Dashboard/Card/AllergyCard';
import HistoryCard from '~/components/EMR/Dashboard/Card/HistoryCard';
import ImmunizationCard from '~/components/EMR/Dashboard/Card/ImmunizationCard';
import SocialHistoryCard from '~/components/EMR/Dashboard/Card/SocialHistory';
import { DiagnosisCard } from '~/components/EMR/Dashboard/Card/DiagnosisCard';
import { ChiefComplaintCard } from '~/components/EMR/Dashboard/Card/ChiefComplaint';
import { GlobalContext } from '~/services/State';
import EncounterCard from '~/components/Grad/EncounterCard';
import StudentViewPage from '../_StudentViewPage';
import MedicationCard from '~/components/EMR/Dashboard/Card/MedicationCard';
import Orders from '~/components/EMR/Orders/Orders';

export default function Index() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <div className="grid grid-cols-4 mx-4 grid-in-main">
                <DiagnosisCard className="col-span-2" diagnosis={patient.diagnosis} />
                <ChiefComplaintCard className='col-span-2' chiefComplaint={patient.chiefComplaint} />
                <ImmunizationCard className="col-span-3" immunizations={patient.immunizations} />
                <SocialHistoryCard className="col-span-1" history={patient.socialHistory} />
                <HistoryCard className="col-span-3" history={patient.medicalHistory} />
                <AllergyCard className='col-span-1' allergies={patient?.allergies}></AllergyCard>
                <MedicationCard className='col-span-4' medications={patient.medicationOrders} />
                <Orders title='Lab Orders' className="col-span-2" orders={patient.customOrders.filter(c => c.orderKind === OrderKind.lab)} />
                <Orders title='Imaging Orders' className="col-span-2" orders={patient.customOrders.filter(c => c.orderKind === OrderKind.imaging)} />
                <EncounterCard className='col-span-4' notes={patient.notes} />
            </div>
        </StudentViewPage>

    );
}