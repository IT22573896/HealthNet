import { Col, Container, Row, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Emergency.css";

const Emergency = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch emergency requests from the backend
  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        const response = await axios.get("/api/emergency-requests");
        setEmergencyRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmergencyRequests();
  }, []);

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <h2>Emergency Requests</h2>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : emergencyRequests.length === 0 ? (
              <p>No emergency requests found</p>
            ) : (
              <Table striped bordered hover className="emergency-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact Number</th>
                    <th>Symptoms</th>
                    <th>Urgency Level</th>
                    <th>Location</th>
                    <th>Additional Info</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyRequests.map((request) => (
                    <tr key={request._id}>
                      <td>{request.name}</td>
                      <td>{request.age}</td>
                      <td>{request.contactnumber}</td>
                      <td>{request.symptoms}</td>
                      <td>{request.urgencylevel}</td>
                      <td>{request.location}</td>
                      <td>{request.additional}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Emergency;
