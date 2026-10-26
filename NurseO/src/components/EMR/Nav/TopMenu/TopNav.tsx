import React, { useContext } from 'react';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '~/services/State';
import { PatientChart } from '~/core/index';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { signInState } from '~/types/flags';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    homePageLink: string
}
export default function TopNav(props: Props) {
    const { setPatient, setStudentId, studentId } = useContext(GlobalContext)
    const router = useRouter()
    const session = useSession()

    const onLogoutClickHandler = async () => {
        if (studentId === signInState.caseStudy.valueOf()) {
            await router.push(props.homePageLink)
            await signOut()
        } else {
            setPatient(new PatientChart())
            setStudentId("")
            await router.push(props.homePageLink)
        }
    }

    return (
        <nav className={"bg-white shadow-lg " + props.className} aria-label='Top Nav Bar'>
            <div className="flex justify-around">
                <Logo homePageLink={props.homePageLink} />
                <div className="flex items-center space-x-8">
                    {props.children}
                </div>

                <div className="flex items-center space-x-3">
                    <span className="font-medium rounded ">
                        {session.data?.user.name ? <span>Hi {session.data?.user.name}</span> : null}
                        <span className='font-bold mx-2'>|</span>
                        <button className="cursor-pointer inline-flex gap-x-2 items-center" onClick={onLogoutClickHandler}>
                            Logout
                            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                        </button>
                    </span>
                </div>
            </div>
        </nav>

    );
}
