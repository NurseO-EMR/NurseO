import { useState, useEffect } from "react";
import { Card } from "~/components/Card";
import { Td } from "~/components/Table/Td";
import { Tr } from "~/components/Table/Tr";
import PageView from "../_PageView";
import { findIndex } from "lodash";

export default function ViewAdminsPage() {
    const [admins, setAdmins] = useState<string[]>([])

    // TODO: Get this to work


    // const getLocations = async () => {
    //     const db = Database.getInstance()
    //     const admins = await db.getAdminList();
    //     setAdmins(admins)
    // }

    // useEffect(() => {
    //     getLocations()
    // }, [])


    const onDeleteClickHandler = async (email: string) => {
        // const db = Database.getInstance()
        // const admins = await db.getAdminList()
        // const index = findIndex(admins, email)
        // admins.splice(index, 1);
        // await db.updateAdminList(admins)
        
        // setAdmins([...admins])
    }


    return <PageView>
        <Card>
            <h1 className="text-blue text-left font-bold text-lg pb-2">Admins:</h1>
            <table className="w-full">
                <thead>
                    <Tr>
                        <th className="border font-normal">Admin Email</th>
                        <th className="border font-normal">Remove</th>
                    </Tr>
                </thead>
                <tbody>
                    {admins.map((a, i) =>
                        <Tr key={i}>
                            <Td>{a}</Td>
                            <td><button 
                            className="bg-red text-white px-4 py-2 mx-auto w-full" 
                            onClick={() => onDeleteClickHandler(a)}>Remove</button></td>
                        </Tr>
                    )}
                </tbody>
            </table>
        </Card>
    </PageView>
}