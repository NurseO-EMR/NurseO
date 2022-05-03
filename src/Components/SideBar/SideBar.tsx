import Logo from "../Logo";
import Category from "./Category";
import SideBarItem from "./SideBarItem";
import {
    faBuilding, faHammer, faLocationPin,
    faMicroscope, faPills, faScaleBalanced,
    faScrewdriverWrench, faStethoscope,
    faUserPen, faUserPlus
} from "@fortawesome/free-solid-svg-icons"

type Props = {
    className?: string
}
export default function SideBar(props:Props) {

    return (
        <div className={`bg-stone-900 min-h-full h-screen border-r-2 border-white ${props.className}`}>
            <Logo />
            <div className=''>
                <Category title='patient'>
                    <SideBarItem href='/patients/create' text='Create Patient' logo={faUserPlus} selected />
                    <SideBarItem href='/patients/edit' text='Edit Patient' logo={faUserPen} />
                </Category>
                <Category title='Reports'>
                    <SideBarItem href='/reports/assessment' text='Edit Assessment' logo={faMicroscope} />
                    <SideBarItem href='/reports/vitals' text='Edit Vitals' logo={faStethoscope} />
                    <SideBarItem href='/reports/scales' text='Edit Scales' logo={faScaleBalanced} />
                </Category>
                <Category title='Medications'>
                    <SideBarItem href='/medications/edit' text='Edit Medications' logo={faPills} />
                    <SideBarItem href='/medications/locations/edit' text='Edit locations' logo={faBuilding} />
                    <SideBarItem href='/medications/locations/create' text='Create location' logo={faLocationPin} />
                </Category>
                <Category title='Administrator'>
                    <SideBarItem href='/admin/editAdmins' text='Add/Remove Admins' logo={faHammer} />
                    <SideBarItem href='/admin/editSettingsRaw' text='Edit Settings Raw' logo={faScrewdriverWrench} />
                </Category>
            </div>
        </div>

    );
}
