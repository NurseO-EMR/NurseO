import { faBook, faBuilding, faIdCard, faPills } from "@fortawesome/free-solid-svg-icons";
import { DashboardNavCard } from "~/components/DashboardNavCard";
import PageView from "./_PageView";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";
import { env } from "~/env";

export default function DashboardPage() {
    return (
        <PageView>

            <div className="mt-[13vh] mb-[5vh]">

                {/* <h1 className="text-white text-5xl tracking-[1rem] mb-20 text-center">What do you want to do?</h1> */}
                <div className="flex gap-20 w-[80vw] flex-wrap">
                    <DashboardNavCard icon={faIdCard} title="Patients">
                        <Link href={"/patient/create"}>Create Patient</Link>
                        <Link href={"/patient/view"}>View/Edit Patients</Link>
                    </DashboardNavCard>
                    <DashboardNavCard icon={faPills} title="Medications">
                        <Link href={"/meds/"}>Create Medication</Link>
                        <Link href={"/meds/"}>Add location to medication</Link>
                        <Link href={"/meds/view"}>View/Edit Medications</Link>
                    </DashboardNavCard>
                    <DashboardNavCard icon={faBuilding} title="Locations">
                        <Link href={"/locations/create"}>Create a new location</Link>
                        <Link href={"/locations/"}>View/delete locations</Link>
                    </DashboardNavCard>

                    <DashboardNavCard icon={faBook} title="Course">
                        <Link href={"/courses/create"}>Create a new course</Link>
                        <Link href={"/courses/"}>View/delete courses</Link>

                    </DashboardNavCard>

                    <DashboardNavCard icon={faBuilding} title="Admin">
                        <Link href={"/admins/"}>View/Edit Admins</Link>
                    </DashboardNavCard>
                </div>

            </div>

        </PageView>
    );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    if (env.TEST_ENV) {
        return {
            props: { session }
        }
    }

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }

    return {
        props: { session }
    }
};