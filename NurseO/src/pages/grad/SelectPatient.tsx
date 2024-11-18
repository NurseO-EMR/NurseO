import { useContext, useEffect, useRef, useState } from 'react';
import { Background } from '~/components/common/Background';
import SignInButton from '~/components/EMR/Form/SignInButton';
import { GlobalContext } from '~/services/State';
import { useRouter } from 'next/navigation'
import { api } from '~/utils/api';


export default function SelectPatient() {
    const router = useRouter()
    const { studentId, setPatient, locationId } = useContext(GlobalContext)
    const [barcode, setProvidedBarcode] = useState("")
    const [error, setError] = useState("")
    const patientMutation = api.emr.student_getPatient.useMutation()
    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (studentId.length === 0) {
            router.push("/grad/")
        }
    }, [router, studentId.length])




    const onClickHandler = async (wait: () => void, keepGoing: () => void) => {
        wait();
        const patient = await patientMutation.mutateAsync({ barcode: barcode, locationId, studentId })
        if (patient) {
            setPatient(patient)
            router.push("/grad/dashboard")
        }
        else {
            keepGoing()
            setError("Error: Patient Not Found")
            setProvidedBarcode("")
            inputRef.current?.focus()
        }
    }
    return (
        <div>
            <Background />
            <div className="grid justify-center h-screen w-screen content-center text-center">
                <form className="bg-white p-28 rounded-4xl border-primary/60 border-8" onSubmit={e => e.preventDefault()}>
                    <h1 className="text-4xl font-bold">Please
                        <span className="text-primary/80"> scan </span>
                        the patient armband</h1>
                    <input type="text"
                        autoFocus
                        className="my-5 border-2 rounded-full text-center p-4 border-primary w-full"
                        placeholder="Or type the patient number here"
                        onChange={e => setProvidedBarcode(e.currentTarget.value)}
                        ref={inputRef}
                        value={barcode}
                    /><br />
                    <SignInButton onClick={onClickHandler} />
                    <div>{error}</div>
                </form>
            </div>
        </div>
    );
}