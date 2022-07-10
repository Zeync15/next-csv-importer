import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />

      <div className="d-flex justify-content-center">
        <Container className="px-3 my-3">{children}</Container>
      </div>
    </>
  );
};

export default Layout;
