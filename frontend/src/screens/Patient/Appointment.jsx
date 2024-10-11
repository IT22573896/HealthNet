import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button } from "react-bootstrap"; // Bootstrap components
import "../../styles/Doctors.css"; // Reusing the same Doctors.css for styling
import { useNavigate } from "react-router-dom"; // For navigation

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contactNumber: '',
    specialization: '',
    hospitalName: '',
    doctorName: '',
    fee: '', // New field for fee
    date: '',
    starttime: '', // Storing as string in 12-hour format (e.g., "6:30 p.m.")
  });

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Specialization options
  const specializationOptions = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "heart",
    // Add more specializations as needed
  ];

  // Hospital name options (example)
  const hospitalOptions = [
    "City Hospital",
    "General Hospital",
    "Children's Hospital",
    "Heart Care Center",
    "Lanka Hospital,Colombo"
    // Add more hospitals as needed
  ];

  // Fetch doctors based on specialization and hospital name
  useEffect(() => {
    if (formData.specialization && formData.hospitalName) {
      axios.get(`/api/appointments/doctor/${formData.specialization}/${formData.hospitalName}`)
        .then(response => {
          setDoctors(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [formData.specialization, formData.hospitalName]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "doctorName") {
      const selectedDoctor = doctors.find(doctor => doctor.doctorname === value);
      if (selectedDoctor) {
        setFormData(prevData => ({
          ...prevData,
          starttime: selectedDoctor.starttime, // Keep the 12-hour format (e.g., "6:30 p.m.")
          date: selectedDoctor.date.split('T')[0], // Convert to "yyyy-MM-dd" format
          fee: selectedDoctor.fee, // Set the doctor's fee
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          starttime: '',
          date: '',
          fee: '',
        }));
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      await axios.post("http://localhost:3000/api/appointments/createAppointment", formData);
      alert('Appointment Created Successfully');
      
      // Reset the form
      setFormData({
        name: '',
        age: '',
        contactNumber: '',
        specialization: '',
        hospitalName: '',
        doctorName: '',
        fee: '',
        date: '',
        starttime: '',
      });

      // Navigate to the appointments page
      navigate("/getAllAppointments");
    } catch (error) {
      console.error("Error creating appointment:", error.response.data);
    }
  };

  return (
    <Container fluid className="AdminDashboard"> {/* Ensures the fluid layout */} 
      <Row className="justify-content-center">
        <Col md={5} lg={4}> {/* Adjusted width for smaller form */} 
          <h1 className="mb-4 text-center">Create Appointment</h1>
          <Form className="form-reduce-font" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                as="select"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialization</option>
                {specializationOptions.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="hospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                as="select"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              >
                <option value="">Select Hospital</option>
                {hospitalOptions.map((hospital, index) => (
                  <option key={index} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="doctorName">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                as="select"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor.doctorname}>
                    {doctor.doctorname}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="fee">
              <Form.Label>Doctor's Fee</Form.Label>
              <Form.Control
                type="text"
                name="fee"
                value={formData.fee}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="starttime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                name="starttime"
                placeholder="e.g., 6:30 p.m."
                value={formData.starttime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100"> {/* Full width button */}
              Submit Appointment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Appointment;
