import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/Navigation.css";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <header>
      <Navbar expand="lg" className="second">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#about">About</Nav.Link>
            <NavDropdown title="Services" id="services-dropdown" className="drop">
              <LinkContainer to="/appointments">
                <NavDropdown.Item href="#services">
                  Appointments
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/medicalrecord">
                <NavDropdown.Item href="#services">
                  Medical Records
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/emergencyrequest">
                <NavDropdown.Item href="#services">
                  Emergency Request
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/payment">
                <NavDropdown.Item href="#services">
                  Payment Gateway
                </NavDropdown.Item>
              </LinkContainer>
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
