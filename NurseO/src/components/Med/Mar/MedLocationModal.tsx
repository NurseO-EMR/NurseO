import { useContext, useState } from 'react';
import PureModal from "react-pure-modal"

import { NarcoticCountModel } from "./NarcoticCountModel"
import type { Medication, MedicationOrder } from '~/core/index';
import { api } from '~/utils/api';
import { GlobalContext } from '~/services/State';

type Props = {
    order: MedicationOrder | Medication
    onClose: () => void
}

export function MedLocationModal(props: Props) {

    const { locationId } = useContext(GlobalContext)
    const { data: locations } = api.medication.student_getMedicationLocations.useQuery({ medId: props.order.id, locationId })
    const [showNarcoticCountModel, setShowNarcoticCountModel] = useState<boolean>(false)


    return (
        <PureModal width='60vw' header="Order" isOpen={true} onClose={props.onClose} className="min-h-[33vh]">
            <div>
                {props.order.narcoticCountNeeded ?
                    <h1 className='text-center text-primary font-bold text-xl my-2'>Narcotic Count Required</h1>
                    : null}
                {locations?.length && locations.length > 0 ?
                    <table className='w-full m-auto'>
                        <thead>
                            <tr className='text-left h-10'>
                                <th className='pl-5'>Generic</th>
                                <th className='pl-5'>Brand</th>
                                <th className='pl-5'>Type</th>
                                <th className='pl-5'>Dose</th>
                                <th>Drawer</th>
                                <th>Slot</th>
                                {props.order.narcoticCountNeeded ? <th>Narcotic Count</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location, i) =>
                                <tr key={i} className='h-16 odd:bg-gray-100 even:bg-gray-300 hover:bg-primary hover:text-white'>
                                    <td className='pl-5'>{props.order.genericName}</td>
                                    <td className='pl-5'>{props.order.brandName}</td>
                                    <td className='pl-5'>{location.type.toLocaleUpperCase()}</td>
                                    <td>{location.dose}</td>
                                    <td>{location.drawer}</td>
                                    <td>{location.slot}</td>
                                    {props.order.narcoticCountNeeded ?
                                        <td className='w-36'>
                                            <button className='bg-primary text-white px-10 h-10 rounded-md'
                                                onClick={() => setShowNarcoticCountModel(true)}
                                            >Count</button>
                                        </td>
                                        : null}
                                </tr>
                            )}
                        </tbody>
                    </table> :
                    <h1 className='text-center font-bold py-6'>Medication is not available, please call pharmacy</h1>
                }

                {showNarcoticCountModel ?
                    <NarcoticCountModel order={props.order} onClose={() => setShowNarcoticCountModel(false)} />
                    : null}

            </div>
        </PureModal>
    );
}
