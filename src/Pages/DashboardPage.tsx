import { faBuilding, faGear, faIdCard, faPills } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DashboardNavCard } from "../Components/DashboardNavCard";
import PageView from "./PageView";

export default function DashboardPage() {


    return (
        <PageView>

            <div className="mt-[20vh]">

                <h1 className="text-white text-5xl tracking-[1rem] mb-20 text-center">What do you want to do?</h1>
                <div className="flex gap-20 w-[80vw] flex-wrap">
                    <DashboardNavCard icon={faIdCard} title="Patients">
                        <Link to={"/patient/create"}>Create Patient</Link>
                        <Link to={"/patient/view"}>View/Edit Patients</Link>
                    </DashboardNavCard>
                    <DashboardNavCard icon={faPills} title="Medications">
                        <Link to={"/meds/create"}>Create Medication</Link>
                        <Link to={"/meds/create"}>Add location to medication</Link>
                        <Link to={"/meds/view"}>View/Edit Medications</Link>
                    </DashboardNavCard>
                    <DashboardNavCard icon={faBuilding} title="Locations">
                        <Link to={"/locations/create"}>Create a new location</Link>
                        <Link to={"/locations/view"}>View/delete locations</Link>
                    </DashboardNavCard>
                    
                    <DashboardNavCard icon={faBuilding} title="Admin">
                        <Link to={"/admins/create"}>Add Admin</Link>
                        <Link to={"/admins/view"}>View/Edit Admins</Link>
                    </DashboardNavCard>
                    <DashboardNavCard icon={faGear} title="Settings ( DO NOT USE UNLESS YOU KNOW WHAT YOU ARE DOING)">
                        <Link to={"/settings/rawEdit"}>RAW Settings Editor</Link>
                    </DashboardNavCard>
                </div>

            </div>

        </PageView>
    );
}