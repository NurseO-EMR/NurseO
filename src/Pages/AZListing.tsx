import { uniq } from "lodash";
import { Medication } from "nurse-o-core";
import { useEffect, useState } from "react";
import { MedLocationModal } from "../Components/Mar/MedLocationModal";
import { TopNav } from "../Nav/TopMenu/TopNav";
import { Database } from "../Services/Database";

export function AZListing() {
    const [fullMeds, setFullMeds] = useState<Medication[]>([])
    const [meds, setMeds] = useState<Medication[]>([])
    const [alphabet, setAlphabet] = useState<string[]>([])
    const [medSelected, setMedSelected] = useState<Medication | null>(null)

    useEffect(() => {
        const db = Database.getInstance()
        db.getMedications().then(medications => {
            let letters: string[] = []
            for (const med of medications) {
                const firstLetter = (med.genericName || "")[0]
                letters.push(firstLetter.toUpperCase());
            }
            letters = uniq(letters);
            letters = letters.sort();
            setAlphabet([...letters]);
            setMeds([...medications])
            setFullMeds(medications)
        })

    }, [])


    const onSearchedTextChangeHandler=(text:string)=>{
        const filtered = fullMeds.filter(m=>(m.genericName || "").toLowerCase().startsWith(text.toLowerCase()))
        setMeds(filtered);
    }

    return <div className="overflow-x-hidden ">
        <TopNav />
        <div className="w-screen px-20 bg-gray-50">
            <div className="font-bold text-center pt-10">
                <h1>Search the name of the medication you are looking for</h1>
                <input type="text"
                 className="border bg-white border-black h-10 w-[80vw] rounded-lg px-4 text-center" 
                 onChange={e=>onSearchedTextChangeHandler(e.currentTarget.value)}
                 />
                <h2>And/or select it from the list bellow:</h2>
            </div>
            {alphabet.map((letter, i) =>
                <div key={i}>
                    <h1 className="text-5xl border-b-2 text-gray-400 mb-4">{letter}</h1>
                    {meds.filter(m => (m.genericName || "")[0].toUpperCase() === letter).sort().map((med, j) =>
                        <div key={j} onClick={()=>setMedSelected(med)}
                            className="h-16 my-1 bg-red-200 flex items-center pl-20 justify-between
                                    hover:bg-red-700 hover:text-white hover:font-bold 
                                    transition-all cursor-pointer
                         ">
                            <div>
                                {med.genericName} {" "}
                                {med.brandName ? "(" + med.brandName + " )" : null}
                            
                            </div>
                            <button className="bg-red-700 text-white h-full w-40 
                           border-l-4 border-white">Locate</button>
                        </div>
                    )}
                </div>
            )}
        </div>
        {medSelected ? <MedLocationModal med={medSelected} onClose={()=>setMedSelected(null)} /> : null}
        
    </div>
}