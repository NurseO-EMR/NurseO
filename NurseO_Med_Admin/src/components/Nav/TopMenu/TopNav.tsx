import { Logo } from './Logo';
import { getAuth } from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { $locationID } from '../../Services/State';
import { Link } from 'react-router-dom';

type Props = {
    className?: string
}
export function TopNav(props: Props) {

    const auth = getAuth()
    const navigate = useNavigate()

    const onLogoutClickHandler = async () => {
        await auth.signOut();
        navigate("/?location=" + $locationID.value)
        window.location.reload();
    }


    const onBackClickHandler = ()=>{
        if(window.location.pathname === "/dashboard") navigate("/selectPatient")
        else navigate("/dashboard")
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
                    <Link to="/AZListing" className='bg-primary rounded-md text-white px-8 py-2 text-center'>
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
