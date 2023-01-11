import PureModal from "react-pure-modal";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Td } from "../Table/Td";
import { Tr } from "../Table/Tr";

export function MarRecordEditor() {
    return <PureModal isOpen={true} width="40vw" header="Mar Record Editor">
        <div className="grid gap-4 justify-around grid-cols-2">
            <form onSubmit={e=>e.preventDefault()} className="w-full">
                <h1 className="font-bold">Add Record</h1>
                <Input label="Time" type="time" />
                <Input label="Dose (with units)" />
                <Button className="bg-success my-2">Add Record</Button>
            </form>

            <div className="w-full">
                <h1 className="font-bold">View/Edit Mar Records</h1>
                <table className="w-full mt-10">
                    <thead>
                        <Tr>
                            <th className="border">Time</th>
                            <th className="border">Dose</th>
                            <th className="border">Delete</th>
                        </Tr>
                    </thead>
                    <tbody>
                        <Tr>
                            <Td>12:00</Td>
                            <Td>20 mg</Td>
                            <td><button className="bg-red min-w-full h-10 text-white font-semibold px-4">Delete</button></td>
                        </Tr>
                    </tbody>
                </table>
            </div>
            <Button className="bg-blue my-2 col-span-2">Done</Button>
        </div>
    </PureModal>
}