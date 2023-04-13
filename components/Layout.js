import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
     <Head>
          <title>Next Csv Importer by Ze Yen</title>
          <meta
            name="description"
            content="CSV Importer App created by using Nextjs and BootStrap"
          />
        </Head>

      <NavBar />

      <div className="d-flex justify-content-center">
        <Container className="px-3 my-3">{children}</Container>
      </div>
    </>
  );
};

export default Layout;
