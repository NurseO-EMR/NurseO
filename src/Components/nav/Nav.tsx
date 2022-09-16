import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { Dropdown } from "./Dropdown";

export function Nav() {
    const nav = useNavigate()

    const onLogoutClickHandler = async ()=>{
        const auth = getAuth()
        await auth.signOut()
        nav("/login")
    }

    return (
        <nav aria-label="primary" className="absolute top-0 shadow-xl w-screen py-4 px-[10vw] h-fit flex justify-between items-center bg-white/95 z-20">
            <Link to="/"><Logo className="text-2xl" /></Link>
            <div className="flex gap-10 align-middle">
                <Link to="/">Home</Link>
                <Dropdown label="Patients">
                    <Link to="/patient/create">Create Patient</Link>
                    <Link to="/patient/view">View/Edit Patients</Link>
                </Dropdown>
                <Dropdown label="Medications">
                    <Link to="/meds/create">Create Medication</Link>
                    <Link to="/meds/view">View/Edit Medications</Link>
                </Dropdown>
                <Dropdown label="Locations">
                    <Link to="/locations/create">Create Location</Link>
                    <Link to="/locations/view">View/Edit Locations</Link>
                </Dropdown>

                <FontAwesomeIcon onClick={onLogoutClickHandler} className="pt-1 cursor-pointer text-lg" icon={faRightFromBracket} />

            </div>
        </nav>
    )

}