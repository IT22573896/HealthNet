import { Col, Container, Row } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";

import "../../styles/Reports.css";

const Reports = () => {
  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <div className="report_list">Reports</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
