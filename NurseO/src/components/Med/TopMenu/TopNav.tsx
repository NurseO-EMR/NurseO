import { Logo } from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
    className?: string
}
export function TopNav(props: Props) {

    const router = useRouter()

    const onLogoutClickHandler = () => {
        router.push("/nurseo_med")
    }


    const onBackClickHandler = () => {
        if (window.location.pathname.includes("/nurseo_med/dashboard")) router.push("/nurseo_med/selectPatient")
        else router.push("/nurseo_med/dashboard")
    }

    return (
        <nav className={"bg-white shadow-lg " + props.className}>
            <div className="flex justify-around">
                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faArrowLeftLong} onClick={onBackClickHandler}
                        className="text-xl mr-10 cursor-pointer" />
                    <Logo className='flex-row text-xl' />
                </div>

                <div className="flex items-center space-x-8">

                </div>

                <div className="flex items-center space-x-3">
                    <Link href="/nurseo_med/AZListing" className='bg-primary rounded-md text-white px-8 py-2 text-center'>
                        A-Z Medication List
                    </Link>
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
