import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import 'react-pure-modal/dist/react-pure-modal.min.css';
import "~/styles/globals.css";
import { type MedicationOrder, PatientChart, type Time } from "~/core/index";
import { useState, useEffect } from "react";
import { storeLocation, getLocationFromStorage } from "~/services/LocalStorage";
import { GlobalContext } from "~/services/State";
import { env } from "~/env.js";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {


  const [studentId, setStudentId] = useState("")
  const [patient, setPatient] = useState<PatientChart>(new PatientChart())
  const [locationId, setLocationId] = useState(-1)
  const [patientMedOrders, setPatientMedOrders] = useState<MedicationOrder[]>([])
  const [time, setTime] = useState<Time>({ hour: 0, minute: 0 })

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let location = queryParams.get('location');
    if (location) storeLocation(location)
    else location = getLocationFromStorage()

    if (location && !Number.isNaN(location)) setLocationId(Number.parseInt(location))

  }, [])


  return (
    <SessionProvider session={session} basePath={`/${env.NEXT_PUBLIC_basePath}/api/auth`}>
      <GlobalContext.Provider value={{ studentId, setStudentId, patient, setPatient, locationId, setLocationId, patientMedOrders, setPatientMedOrders, time, setTime }}>
        <div id="topLevelDiv" className={"standard " + GeistSans.className}>
          <Component {...pageProps} />
        </div>
      </GlobalContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
