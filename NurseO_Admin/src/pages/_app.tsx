import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import 'react-pure-modal/dist/react-pure-modal.min.css';
import "~/styles/globals.css";
import { env } from "~/env";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session} basePath={`/${env.NEXT_PUBLIC_BASE_PATH}/api/auth`}>
      <div id="topLevelDiv" className={"standard" + GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
