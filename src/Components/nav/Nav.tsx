import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { Dropdown } from "./Dropdown";

export function Nav() {
    return (
        <nav aria-label="primary" className="absolute top-0 shadow-xl w-screen py-4 px-[10vw] h-fit flex justify-between items-center bg-white/95 z-20">
            <Link to="/"><Logo className="text-2xl" /></Link>
            <div className="flex gap-10 align-middle">
                <Link to="">Home</Link>
                <Dropdown label="Patients">
                    <Link to="">Create Patient</Link>
                    <Link to="">View/Edit Patients</Link>
                </Dropdown>
                <Dropdown label="Medications">
                    <Link to="">Create Medication</Link>
                    <Link to="">View/Edit Medications</Link>
                </Dropdown>
                <Dropdown label="Locations">
                    <Link to="">Create Location</Link>
                    <Link to="">View/Edit Locations</Link>
                </Dropdown>
            </div>
        </nav>
    )

}