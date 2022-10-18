import { faArrowsRotate, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { checkMeds, MedBarCodeCombo } from "../Services/AutoChecker/MedsAutoChecker";
import { Cache } from "./../Services/Cache"

export function AutoChecker() {
    const [medWIssues, setMedWIssues] = useState<MedBarCodeCombo[]>([])
    useEffect(() => {
        const cache = Cache.getInstance()
        const meds = cache.getMeds()
        const medWIssues = checkMeds(meds)
        setMedWIssues(medWIssues)
    }, [])


    if (medWIssues.length>0) {
        return <div className="bg-red shadow-xl mx-auto rounded-lg grid min-h-[20vh] w-[20vw] py-5 px-4 text-white">
            <FontAwesomeIcon icon={faFaceAngry} className="block m-auto text-7xl" />
            <h1 className="text-center font-bold mt-1">I found {medWIssues.length} medications that have the same barcode for the same location</h1>
        </div>
    } else {

        return <div className="bg-gray shadow-xl mx-auto rounded-lg grid min-h-[20vh] w-[20vw] py-5 px-4 text-blue">
            <FontAwesomeIcon icon={faArrowsRotate} spin={true} className="block m-auto text-7xl" />
            <h1 className="text-center font-bold mt-1">Checking for issues</h1>
        </div>
    }


}

