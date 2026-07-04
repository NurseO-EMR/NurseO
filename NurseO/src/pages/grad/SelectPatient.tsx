import { useContext } from 'react';
import { Background } from '~/components/common/Background';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '~/utils/api';
import { GlobalContext } from '~/services/State';
import { useRouter } from 'next/navigation';
import { Announcement, broadcastAnnouncement } from '~/services/AnnouncementService';


export default function SelectPatient() {


    const { locationId, setPatient, studentId } = useContext(GlobalContext)
    const patients = api.med.student_getListOfPatients.useQuery({ locationId })
    const getPatientMutation = api.emr.student_getPatient.useMutation()
    const router = useRouter()

    const onClickHandler = async (index: number) => {
        const patientBasicInfo = patients.data![index]!
        const patient = await getPatientMutation.mutateAsync({ barcode: patientBasicInfo.barcode, locationId, studentId })
        if (!patient) { broadcastAnnouncement("Error while getting patient", Announcement.error); return }
        setPatient(patient)
        router.push("/grad/StudentView/Dashboard")
    }

    const onLogoutClickHandler = () => {
        router.push("/grad/")
    }

    return (
        <div>
            <Background />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <div className="bg-white p-10 rounded-3xl border-primary/80 border-8 w-[60vw] max-h-[80vh] overflow-y-auto"
                    onSubmit={e => e.preventDefault()}>
                    <FontAwesomeIcon icon={faArrowLeftLong} onClick={onLogoutClickHandler}
                        className="text-2xl mr-10 cursor-pointer block" />
                    <h1 className='my-4 font-bold text-3xl'>Select your patient from the list here</h1>
                    <table className='w-full border text-left'>
                        <thead>
                            <tr className='py-10'>
                                <th className='border border-gray-100 pl-10'>Name</th>
                                <th className='border border-gray-100'>DOB</th>
                                <th className='border border-gray-100'>Select</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {patients.data?.map((p, k) =>
                                <tr key={k} className="odd:bg-gray-100 even:bg-gray-300">
                                    <td className='border pl-10 border-gray-300'>{p.name}</td>
                                    <td className='border border-gray-300'>{p.dob}</td>
                                    <td className='border border-gray-300 h-16'>
                                        <button
                                            className='w-full h-full bg-primary text-white'
                                            onClick={() => onClickHandler(k)}
                                        >Select</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
