import { Col, Container, Row } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";

import "../../styles/Patients.css";

const Patients = () => {
  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <div className="patient_list">Patients</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Patients;
