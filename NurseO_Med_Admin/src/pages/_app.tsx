import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GlobalContext } from "~/services/State";
import { useState } from "react";
import type { MedicationOrder, Time } from "@nurse-o-core/index";

import 'react-pure-modal/dist/react-pure-modal.min.css';


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [locationId, setLocationId] = useState(12)
  const [patientMedOrders, setPatientMedOrders] = useState<MedicationOrder[]>([])
  const [time, setTime] = useState<Time>({hour: 0, minute: 0})


  return (
    <SessionProvider session={session}>
      <GlobalContext.Provider value={{ locationId, setLocationId, patientMedOrders, setPatientMedOrders, time, setTime }}>
        <div id="topLevelDiv" className={"standard " + GeistSans.className}>
          <Component {...pageProps} />
        </div>
      </GlobalContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
