import React, { useContext } from 'react';
import { OrderType } from '~/core/index';
import AllergyCard from '~/components/EMR/Dashboard/Card/AllergyCard';
import FlagsCard from '~/components/EMR/Dashboard/Card/FlagsCard';
import HistoryCard from '~/components/EMR/Dashboard/Card/HistoryCard';
import ImmunizationCard from '~/components/EMR/Dashboard/Card/ImmunizationCard';
import SocialHistoryCard from '~/components/EMR/Dashboard/Card/SocialHistory';
import { DiagnosisCard } from '~/components/EMR/Dashboard/Card/DiagnosisCard';
import { ChiefComplaintCard } from '~/components/EMR/Dashboard/Card/ChiefComplaint';
import { GlobalContext } from '~/services/State';
import EncounterCard from '~/components/Grad/EncounterCard';
import StudentViewPage from '../_StudentViewPage';
import MedicationCard from '~/components/EMR/Dashboard/Card/MedicationCard';

export default function Index() {
    const { patient } = useContext(GlobalContext)

    return (
        <StudentViewPage>
            <div className="grid grid-cols-4 mx-4 grid-in-main">
                <DiagnosisCard className="col-span-2" diagnosis={patient.diagnosis} />
                <ChiefComplaintCard className='col-span-2' chiefComplaint={patient.chiefComplaint} />
                <FlagsCard className="col-span-1" flags={patient?.flags}></FlagsCard>
                <ImmunizationCard className="col-span-2" immunizations={patient.immunizations} />
                <SocialHistoryCard className="col-span-1" history={patient.socialHistory} />
                <HistoryCard className="col-span-3" history={patient.medicalHistory} />
                <AllergyCard className='col-span-1' allergies={patient?.allergies}></AllergyCard>
                <MedicationCard className='col-span-4' medications={patient.medicationOrders} />
                <EncounterCard className='col-span-4' notes={patient.notes} />
            </div>
        </StudentViewPage>

    );
}