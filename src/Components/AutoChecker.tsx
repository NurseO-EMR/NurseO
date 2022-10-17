import { faArrowsRotate, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Medication } from "nurse-o-core";
import { useEffect } from "react";
import {Cache} from "./../Services/Cache"

export function AutoChecker() {
    const cache = Cache.getInstance()
    useEffect(()=>{
        const meds = cache.getMeds()
        checkMeds(meds)
        
    }, [cache])


    
    return <div className="bg-gray shadow-xl mx-auto rounded-lg min-h-[20vh] w-[20vw] py-5 px-4">
        <FontAwesomeIcon icon={faArrowsRotate} className="block m-auto text-3xl text-blue" />
        <h1 className="text-center font-bold mt-2">Checking for issues</h1>
        <div className="border-b my-4 hover:bg-blue hover:text-white hover:text-xl transition-all">
            <FontAwesomeIcon icon={faCaretRight} />
            <span className="ml-2">test</span>
        </div>
    </div>
}


function checkMeds(meds:Medication[]){
    const locations = new Map<string, string[]>()
    for(const med of meds) {
        for(const location of med.locations) {
            if(locations.has(location.id)) {
                locations.get(location.id)?.push(location.barcode)
            } else {
                const barcode = [location.barcode]
                locations.set(location.id, barcode)
            }
        }
    }

    console.log(locations)
}