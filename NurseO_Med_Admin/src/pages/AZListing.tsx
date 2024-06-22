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
            console.log(medications.filter((m)=>m.id === "9f6c1163-17be-4288-a0a4-d2e3c053ac55"))
            const letters = getLetters(medications)
            setAlphabet([...letters]);
            setMeds([...medications])
            setFullMeds(medications)
        })

    }, [])


    const onSearchedTextChangeHandler=(text:string)=>{
        const filtered = fullMeds.filter(m=>{
            if(m.brandName && m.brandName.toLowerCase().startsWith(text.toLowerCase())) return true
            if(m.genericName && m.genericName.toLowerCase().startsWith(text.toLowerCase())) return true
            return false
        })
        const letters = getLetters(filtered)
        setMeds([...filtered]);
        setAlphabet([...letters])
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
                            className="h-16 my-1 bg-primary/20 flex items-center pl-20 justify-between
                                    hover:bg-primary hover:text-white hover:font-bold 
                                    transition-all cursor-pointer
                         ">
                            <div>
                                {med.genericName} {" "}
                                {med.brandName ? "(" + med.brandName + ")" : null}
                            
                            </div>
                            <button className="bg-primary text-white h-full w-40 
                           border-l-4 border-white">Locate</button>
                        </div>
                    )}
                </div>
            )}
        </div>
        {medSelected ? <MedLocationModal med={medSelected} onClose={()=>setMedSelected(null)} /> : null}
        
    </div>
}


function getLetters(medications:Medication[]): string[] {
    let letters: string[] = []
    for (const med of medications) {
        const firstLetter = (med.genericName || "")[0]
        letters.push(firstLetter.toUpperCase());
    }
    letters = uniq(letters);
    letters = letters.sort();
    return letters
}