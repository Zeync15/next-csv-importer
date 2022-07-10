import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "bootswatch/dist/darkly/bootstrap.min.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
