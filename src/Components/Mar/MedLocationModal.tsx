import React, { useState } from 'react';
import PureModal from "react-pure-modal"
import { MedicationModified, MedSupply } from "./../../Services/Core"
import { Button } from "nurse-o-core"
import {VerifyPopup} from './VerifyPopup';
import { filter } from 'lodash';

type Props = {
    med: MedicationModified | null,
    onClose: () => void
}

export function MedLocationModal(props: Props) {

    const getMedSupplies = () => {
        if (!props.med) return [];
        const building = "UHH";
        const station = "NurseA";
        const filteredLocations = filter(props.med.locations, { building, station })
        //there should be only one left
        if (filteredLocations.length === 0) return []
        return filteredLocations[0].supply;
    }


    const onMedVerify = (medSupply: MedSupply) => {
        if (medSupply) setMedToBeVerified(medSupply)
    }

    const onMedVerified = () => {
        setMedToBeVerified(null)
        props.onClose();
    }



    const [supplies, setSupplies] = useState(getMedSupplies())
    const [medToBeVerified, setMedToBeVerified] = useState<MedSupply | null>(null)




    return (
        <PureModal width='60vw' header="Order" isOpen={true} onClose={props.onClose}>
            <div>
                <h1 className='font-bold text-lg py-2 text-red-700 text-center'>
                    Acetaminophen 10mg/kg PO q7hr PRN
                </h1>
                {supplies.length > 0 ?
                    <table className='w-full m-auto'>
                        <thead>
                            <tr className='text-left h-10'>
                                <th className='pl-5'>Medication</th>
                                <th>Drawer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplies.map((supply, i) =>
                                <tr key={i} className='h-16 odd:bg-gray-100 even:bg-gray-300 '>
                                    <td className='pl-5'>{supply.name}</td>
                                    <td>{supply.drawer}</td>
                                    <td><Button onClick={() => onMedVerify(supply)}>Verify</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table> :
                    <h1 className='text-center font-bold py-6'>Medication is not available, please call pharmacy</h1>
                }

                {medToBeVerified ?
                    <VerifyPopup med={medToBeVerified}
                        onVerified={onMedVerified}
                        onClose={onMedVerified} />
                    : null}

            </div>
        </PureModal>
    );
}
