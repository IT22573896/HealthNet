import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "../styles/Navigation.css";

const Navigation = () => {
  return (
    <header>
      <Navbar bg="transparent" expand="lg" className="second">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <NavDropdown title="Services" id="services-dropdown">
              <NavDropdown.Item href="#services">Cardiology</NavDropdown.Item>
              <NavDropdown.Item href="#services">Pulmonology</NavDropdown.Item>
              <NavDropdown.Item href="#services">Hematology</NavDropdown.Item>
              <NavDropdown.Item href="#services">Orthopedics</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#doctors">Doctors</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Navigation;
