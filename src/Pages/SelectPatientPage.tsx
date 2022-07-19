import { useState } from 'react';
import { Background, SignInButton } from "nurse-o-core"
import { Database } from "./../Services/Database"
import { useNavigate } from 'react-router-dom';


export function SelectPatient() {



    const database = Database.getInstance();
    const [patientID, setPatientID] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()




    const onClickHandler = async (wait: () => void, keepGoing: () => void) => {
        wait();
        const patientExist = await database.getPatient(patientID);
        if (patientExist) navigate("/dashboard");
        else {
            keepGoing();
            setError("patient not found")
        }
    }


    return (
        <div>
            <Background />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form className="bg-white p-28 rounded-4xl border-red-500 border-8" onSubmit={e => e.preventDefault()}>
                    <h1 className="text-4xl font-bold">Please
                        <span className="text-red-600"> scan </span>
                        the patient armband</h1>
                    <input type="text"
                        className="my-5 border-2 rounded-full text-center p-4 border-red-700 w-full"
                        placeholder="Or type the patient number here"
                        onChange={e => setPatientID(e.currentTarget.value)}
                    /><br />
                    <SignInButton onClick={onClickHandler} />
                    <div>{error}</div>
                </form>
            </div>
        </div>
    );
}
