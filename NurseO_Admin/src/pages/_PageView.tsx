import { type ReactNode } from "react";
import { Background } from "~/components/Background";
import { Nav } from "~/components/nav/Nav";
import { AnnouncementViewer } from "~/components/AnnouncementViewer";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";
import { userRoles } from "~/types/userRoles";

type Props = {
    children: ReactNode
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    if (session && session.user.role === userRoles.sim.valueOf()) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    } else if (session?.user) {
        return {
            redirect: {
                destination: "/401",
                permanent: false,
                statusCode: 401
            }
        }
    }

    return {
        props: {session}
    }
};

export default function PageView(props: Props) {

    const year = new Date().getFullYear()

    return (
        <div className="relative grid justify-center min-h-screen">
            <Background></Background>

            <Nav />
            {props.children}

            <footer className="absolute bottom-2 left-5">
                <ul className="flex gap-4 underline underline-offset-4">
                    <li>NurseO © {year}</li>
                    <li>Version 2.4.1</li>
                </ul>
            </footer>


            <AnnouncementViewer />

        </div>

    );

}