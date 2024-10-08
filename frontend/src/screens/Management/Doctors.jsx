import { Col, Container, Row } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";

import "../../styles/Doctors.css";

const Doctors = () => {
  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <div className="patient_list">Doctors</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Doctors;