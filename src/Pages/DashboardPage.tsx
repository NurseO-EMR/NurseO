import { $patient, MedicationOrder } from 'nurse-o-core';
import React from 'react';
import Mar from '../Components/Mar/Mar';
import TopNav from '../Nav/TopMenu/TopNav';

export default class DashboardPage extends React.Component {

     render() {	
        return (
            <div>
                <TopNav />
                <Mar orders={$patient.value.medicationOrders} simTime={$patient.value.time} />
            </div>

        );
    }	
}