import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminDashboardSideNavbar from "../../../components/AdminDashboardSideNavbar";
const EditAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contactNumber: '',
    specialization: '',
    hospitalName: '',
    doctorName: '',
    fee: '',
    date: '',
    starttime: '',
    approvalStatus: 'Not Approved' // Default status
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get appointment ID from URL

  // Fetch appointment data by ID
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`/api/appointments/appointmentgetone/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/appointments/updateAppointmentStatus/${id}`, { approvalStatus: formData.approvalStatus });
      // Optionally, you can also update the date and start time if needed
      await axios.put(`/api/appointments/updateAppointment/${id}`, {
        date: formData.date,
        starttime: formData.starttime,
      });
      alert('Appointment updated successfully');
      navigate("/getAllAppointmentsAdmin"); // Navigate to the appointments page
    } catch (error) {
      console.error("Error updating appointment:", error.response.data);
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
      <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="patient_list">
            
          <h1 className="mb-4 text-center">Edit Appointment</h1>

          <Row className="justify-content-center">
          <Col md={6} lg={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                readOnly // Read-only
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                readOnly // Read-only
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                readOnly // Read-only
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fee">
              <Form.Label>Doctor's Fee</Form.Label>
              <Form.Control
                type="text"
                name="fee"
                value={formData.fee}
                readOnly // Read-only
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="doctorName">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                type="text"
                name="doctorName"
                value={formData.doctorName}
                readOnly // Read-only
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange} // Allow editing
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="starttime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                name="starttime"
                value={formData.starttime}
                onChange={handleChange} // Allow editing
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="approvalStatus">
              <Form.Label>Approval Status</Form.Label>
              <Form.Control
                as="select"
                name="approvalStatus"
                value={formData.approvalStatus}
                onChange={handleChange} // Change handler for dropdown
              >
                <option value="Not Approved">Not Approved</option>
                <option value="Approved">Approved</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit Appointment
            </Button>
          </Form>
          </Col>
          </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAppointment;
