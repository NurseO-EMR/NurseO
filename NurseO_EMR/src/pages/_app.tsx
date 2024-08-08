import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import 'react-pure-modal/dist/react-pure-modal.min.css';

import { GlobalContext } from "~/Services/State";
import { useEffect, useState } from "react";
import { PatientChart } from "@nurse-o-core/index";
import { storeLocation, getLocationFromStorage } from "~/Services/LocalStorage";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {


  const [studentId, setStudentId] = useState("")
  const [patient, setPatient] = useState<PatientChart>(new PatientChart())
  const [locationId, setLocationId] = useState(-1)

  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let location = queryParams.get('location');
    if (location) storeLocation(location)
    else location = getLocationFromStorage()

    if (location && !Number.isNaN(location)) setLocationId(Number.parseInt(location))

  }, [])


  return (
    <SessionProvider session={session}>
      <GlobalContext.Provider value={{ studentId, setStudentId, patient, setPatient, locationId, setLocationId }}>
        <div id="topLevel" className={`standard ` + GeistSans.className}>
          <Component {...pageProps} />
        </div>
      </GlobalContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
