import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar style={{ backgroundColor: "#303030" }} expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: "gray" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">
              CSV Importer
            </Nav.Link>
            <Nav.Link href="/edit-csv" className="text-white">
              Edit CSV Importer
            </Nav.Link>
            <Nav.Link href="/profile" className="text-white">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
