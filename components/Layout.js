import React from "react";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Container>
        <div>{children}</div>
      </Container>
    </>
  );
};

export default Layout;
