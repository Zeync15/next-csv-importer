import React from "react";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Sidebar /> */}
      {/* <Container>
        <div>{children}</div>
      </Container> */}

      <div className="d-flex justify-content-center">
        <Container
          className="px-3 my-5"
          style={{
            backgroundColor: "#303030",
            borderRadius: "5px",
            position: "relative",
            minHeight: "90vh",
          }}
        >
          {children}
        </Container>
      </div>
    </>
  );
};

export default Layout;
