import { Card } from "~/components/Admin/Card";
import { Td } from "~/components/Admin/Table/Td";
import { Tr } from "~/components/Admin/Table/Tr";
import PageView from "../_PageView";
import { api } from "~/utils/api";
import { LoadingCard } from "~/components/Admin/loadingCard";

export default function ViewAdminsPage() {
    const admins = api.setting.getUsersList.useQuery()


    if (admins.isLoading) return <LoadingCard />

    return <PageView>
        <Card>
            <h1 className="text-blue text-left font-bold text-lg pb-2">Admins:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Name</th>
                        <th className="border font-normal">Email</th>
                        <th className="border font-normal">Role</th>
                    </Tr>
                </thead>
                <tbody>
                    {admins.data?.map((a, i) =>
                        <Tr key={i}>
                            <Td>{a.name}</Td>
                            <Td>{a.email}</Td>
                            <Td>{a.role}</Td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </Card>
    </PageView>
}