import { useContext } from 'react';

import type { Medication, MedicationOrder } from '~/core/index';
import { api } from '~/utils/api';
import { GlobalContext } from '~/services/State';
import { Dialog, DialogContent, DialogTitle } from '~/components/common/ui/dialog';

type Props = {
    order: MedicationOrder | Medication
    onClose: () => void
}

export function MedLocationModal(props: Props) {

    const { locationId } = useContext(GlobalContext)
    const { data: locations } = api.med.student_getMedicationLocations.useQuery({ medId: props.order.id, locationId })


    return (
        <Dialog open={true} onOpenChange={e => e === false && props.onClose()}>
            <DialogContent className="min-h-[33vh] min-w-[60vw]">
                <DialogTitle>Order</DialogTitle>
                <div>
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
                                    </tr>
                                )}
                            </tbody>
                        </table> :
                        <h1 className='text-center font-bold py-6'>Medication is not available, please call pharmacy</h1>
                    }

                </div>
            </DialogContent>

        </Dialog>
    );
}
