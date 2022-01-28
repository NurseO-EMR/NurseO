import React from 'react';
import BigNavButton from '../../Components/Form/BigNavButton';
import AdminViewPage from './AdminViewPage';
import { faCapsules, faGlasses, faHeartbeat, faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons'


export default class AdminDashboard extends React.Component {

    public render() {	
        return (
            <AdminViewPage selected="Dashboard">
                <div className='flex justify-center align-middle h-full flex-wrap gap-8 mt-10'>
                    <BigNavButton backgroundColorClassName='bg-green-700' text='Create Patient' linkTo='/admin/patient/create' icon={faPlusCircle} />
                    <BigNavButton backgroundColorClassName='bg-fuchsia-700' text='View Patients' linkTo='/admin/patient/view' icon={faList} />
                    <BigNavButton backgroundColorClassName='bg-violet-700' text='Edit Assessments' linkTo='/admin/assessments/edit' icon={faGlasses} />
                    <BigNavButton backgroundColorClassName='bg-yellow-700' text='Edit Vitals' linkTo='/admin/vitals/edit' icon={faHeartbeat} />
                    <BigNavButton backgroundColorClassName='bg-red-700' text='Edit Medications' linkTo='/admin/medication/edit' icon={faCapsules} />
                </div>
            </AdminViewPage>

        );
    }	
}