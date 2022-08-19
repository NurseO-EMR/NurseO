import { useEffect, useState } from 'react';
import { Database } from "./../Services/Database"
import { useNavigate } from 'react-router-dom';
import { Background } from '../Components/Background';
import { PatientChart } from 'nurse-o-core';


export function SelectPatient() {



    const database = Database.getInstance();
    const [patients, setPatients] = useState<PatientChart[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        database.getTemplatePatients().then(p=>{
            setPatients(p)
        })
    },[database])



    const onClickHandler = async (id:string) => {
        const patientExist = await database.getPatient(id);
        if (patientExist) navigate("/dashboard");
    }


    return (
        <div>
            <Background />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <div className="bg-white p-10 rounded-4xl border-red-500 border-8 w-[60vw]" onSubmit={e => e.preventDefault()}>
                    <h1 className='my-4 font-bold text-3xl'>Select your patient from the list here</h1>
                    <table className='w-full border text-left'>
                        <thead>
                            <tr className='py-10'>
                                <th className='border pl-10'>Name</th>
                                <th className='border'>DOB</th>
                                <th className='border'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p,k)=>
                                <tr key={k} className="odd:bg-gray-100 even:bg-gray-300">
                                    <td className='border pl-10'>{p.name}</td>
                                    <td className='border'>{p.dob}</td>
                                    <td className='border h-16'>
                                        <button 
                                            className='w-full h-full bg-red-700 text-white'
                                            onClick={()=>onClickHandler(p.id)}
                                            >Select</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
