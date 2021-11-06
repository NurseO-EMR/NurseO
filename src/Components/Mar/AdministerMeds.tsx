import React from 'react';
import { PatientChart } from '../../Types/PatientProfile';
import EmptyCard from '../Dashboard/Card/EmptyCard';

type Props = {
    patient: PatientChart
}
export default class AdministerMeds extends React.Component<Props> {

    public render() {
        return (
            <EmptyCard title="Administer Medications">
                <h1>Please scan the medication barcode</h1>
                
            </EmptyCard>
        );
    }
}