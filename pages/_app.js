import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [darkmode, setDarkmode] = useState(true);
  if (darkmode) {
    import("bootswatch/dist/darkly/bootstrap.min.css").then(console.log("darkmode enabled"));
  } else {
    import("bootswatch/dist/cosmo/bootstrap.min.css").then(console.log("darkmode enabled"));
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
