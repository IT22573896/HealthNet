import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AdminDashboard.css";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
