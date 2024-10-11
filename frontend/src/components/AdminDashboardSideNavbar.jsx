import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarCheck,
  FaUserMd,
  FaDollarSign,
  FaHeartbeat,
  FaFileMedical,
} from "react-icons/fa"; // Import icons
import "../styles/AdminDashboardSideNavbar.css"; // Import the CSS file

const AdminDashboardSideNavbar = () => {
  return (
    <div className="admin-dashboard">
      <h4 className="text-center">Admin Dashboard</h4>
      <Nav className="flex-column">
        <LinkContainer to="/overview">
          <Nav.Link>
            <FaTachometerAlt /> Overview
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/patients">
          <Nav.Link>
            <FaUser /> Patients
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/getAllAppointmentsAdmin">
          <Nav.Link>
            <FaCalendarCheck /> Appointments
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/doctors">
          <Nav.Link>
            <FaUserMd /> Doctors
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/payments">
          <Nav.Link>
            <FaDollarSign /> Payments
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/emergency">
          <Nav.Link>
            <FaHeartbeat /> Emergency
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/reports">
          <Nav.Link>
            <FaFileMedical /> Medical Reports
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default AdminDashboardSideNavbar;
