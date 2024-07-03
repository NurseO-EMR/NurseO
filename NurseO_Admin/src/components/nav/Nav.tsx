import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {signOut, useSession} from "next-auth/react"
import { Logo } from "../Logo";
import { Dropdown } from "./Dropdown";
import Link from "next/link";

export function Nav() {
    const session = useSession()
    const onLogoutClickHandler = async ()=>{
        await signOut()
    }

    return (
        <nav aria-label="primary" className="absolute top-0 shadow-xl w-full py-4 px-[10vw] h-fit flex justify-between items-center bg-white/95 z-20">
            <Link href="/"><Logo className="text-2xl" /></Link>
            <div className="flex gap-10 align-middle">
                <Link href="/">Home</Link>
                <Dropdown label="Patients">
                    <Link href="/patient/create">Create Patient</Link>
                    <Link href="/patient/view">View/Edit Patients</Link>
                </Dropdown>
                <Dropdown label="Medications">
                    <Link href="/meds/create">Create Medication</Link>
                    <Link href="/meds/view">View/Edit Medications</Link>
                </Dropdown>
                <Dropdown label="Locations">
                    <Link href="/locations/create">Create Location</Link>
                    <Link href="/locations/view">View/Edit Locations</Link>
                </Dropdown>

                <div>Hi {session.data?.user.name}</div>
                <FontAwesomeIcon onClick={onLogoutClickHandler} className="pt-1 cursor-pointer text-lg" icon={faRightFromBracket} />

            </div>
        </nav>
    )

}