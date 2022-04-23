import React from 'react';
import Logo from '../Logo';
import Category from './Category';
import SideBarItem from './SideBarItem';
import {faHammer, faMicroscope, faPills, faScaleBalanced, faScrewdriverWrench, faStethoscope, faUserPen, faUserPlus} from "@fortawesome/free-solid-svg-icons"


export default class SideBar extends React.Component {

    render() {
        return (
            <div className='bg-stone-900 w-2/12 min-h-full h-screen'>
                <Logo />
                <div className=''>
                    <Category title='patient'>
                        <SideBarItem text='Create Patient' logo={faUserPlus}   selected />
                        <SideBarItem text='Edit Patient' logo={faUserPen}   />
                    </Category>
                    <Category title='Reports'>
                        <SideBarItem text='Edit Assessment' logo={faMicroscope}   />
                        <SideBarItem text='Edit Vitals' logo={faStethoscope}   />
                        <SideBarItem text='Edit Scales' logo={faScaleBalanced}   />
                    </Category>
                    <Category title='Medications'>
                        <SideBarItem text='Edit Medications' logo={faPills}   />
                    </Category>
                    <Category title='Administrator'>
                        <SideBarItem text='Add/Remove Admins' logo={faHammer}   />
                        <SideBarItem text='Edit Settings Raw' logo={faScrewdriverWrench}   />
                    </Category>
                </div>
            </div>

        );
    }
}