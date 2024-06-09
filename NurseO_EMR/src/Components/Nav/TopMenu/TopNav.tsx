import React, { useContext } from 'react';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '~/Services/State';
import { PatientChart } from '@nurse-o-core/index';
import { useRouter } from 'next/router';

type Props = React.HTMLAttributes<HTMLDivElement>
export default function TopNav(props: Props) {
    const {setPatient, setStudentId} = useContext(GlobalContext)
    const router = useRouter()

    const onLogoutClickHandler = async () => {
        setPatient(new PatientChart())
        setStudentId("")
        await router.push("/")
    }

    return (
        <nav className={"bg-white shadow-lg " + props.className}>
            <div className="flex justify-around">
                <Logo />
                <div className="flex items-center space-x-8">
                    {props.children}
                </div>

                <div className="flex items-center space-x-3">
                    <span className="font-medium rounded ">
                        <span className='font-bold'> | </span>
                        <span className="cursor-pointer" onClick={onLogoutClickHandler}>
                            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                        </span>
                    </span>
                </div>
            </div>
        </nav>

    );
}
