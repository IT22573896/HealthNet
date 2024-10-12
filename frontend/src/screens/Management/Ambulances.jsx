import { Col, Container, Row, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Ambulances.css"; // Custom CSS for the table if needed

const Ambulances = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ambulance data from the backend
  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await axios.get("/api/ambulances");
        setAmbulances(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="ambulance_list">
          
            <h2>Ambulance List</h2>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : ambulances.length === 0 ? (
              <p>No ambulances found</p>
            ) : (
              <Table striped bordered hover className="ambulance-table">
                <thead>
                  <tr>
                    <th>Ambulance Number</th>
                    <th>Vehicle Number</th>
                    <th>Driver Name</th>
                    <th>Driver Contact</th>
                    <th>Driver Email</th>
                    <th>Ambulance Type</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {ambulances.map((ambulance) => (
                    <tr key={ambulance._id}>
                      <td>{ambulance.ambulancenumber}</td>
                      <td>{ambulance.vehiclenumber}</td>
                      <td>{ambulance.drivername}</td>
                      <td>{ambulance.drivercontact}</td>
                      <td>{ambulance.driveremail}</td>
                      <td>{ambulance.ambulancetype}</td>
                      <td>{ambulance.availability}</td>
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

export default Ambulances;