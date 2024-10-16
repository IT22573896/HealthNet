import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "../../styles/Doctors.css"; 
import { useNavigate } from "react-router-dom";

const Appointment = () => {
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
  });

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const specializationOptions = [
    "Cardiology", "Dermatology", "Neurology", "Orthopedics",
    "Pediatrics", "Radiology", "heart"
  ];

  const hospitalOptions = [
    "City Hospital", "Asiri Hospital,Colombo", "Children's Hospital,Moratuwa",
    "Heart Care Center,Colombo", "Lanka Hospital,Colombo","Hemas Hospital,Colombo"
  ];

  useEffect(() => {
    if (formData.specialization && formData.hospitalName) {
      axios.get(`/api/appointments/doctor/${formData.specialization}/${formData.hospitalName}`)
        .then(response => setDoctors(response.data))
        .catch(error => console.error(error));
    }
  }, [formData.specialization, formData.hospitalName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for Patient Name: Allow only letters
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Prevent changes if non-letter characters are entered
    }

    // Validation for Contact Number: Allow only 10 digits
    if (name === "contactNumber" && value.length > 10) {
      return; // Prevent more than 10 digits
    }

    setFormData({ ...formData, [name]: value });

    if (name === "doctorName") {
      const selectedDoctor = doctors.find(doctor => doctor.doctorname === value);
      if (selectedDoctor) {
        setFormData(prevData => ({
          ...prevData,
          starttime: selectedDoctor.starttime, 
          date: selectedDoctor.date.split('T')[0],
          fee: selectedDoctor.fee,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      await axios.post("http://localhost:3000/api/appointments/createAppointment", formData);
      alert('Appointment Created Successfully');
      setFormData({
        name: '', age: '', contactNumber: '', specialization: '', hospitalName: '', doctorName: '', fee: '', date: '', starttime: '',
      });
      navigate("/getAllAppointments");
    } catch (error) {
      console.error("Error creating appointment:", error.response.data);
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row className="justify-content-center mb-4"> 
        <Col md="auto">
        <Button 
              onClick={() => navigate('/getAllAppointments')}
              style={{
                padding: '10px 15px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                width: 'fit-content',
                backgroundColor: '#00008B',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              My Appointments
      </Button>
         
        </Col>

        <Col md="auto">
        <Button 
          onClick={() => navigate('/recommendDoctors')}
          style={{
            padding: '10px 15px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            marginLeft: '10px',
            width: 'fit-content',
            backgroundColor: '#0F52BA',
            color: 'white',
            border: 'none',
          }}
        >
          Doctor Recommendation
      </Button>

        </Col>


        <Col md="auto">
        
        <Button 
          onClick={() => navigate('/getDeletedAppointmentsPatient')}
          style={{
            padding: '10px 15px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            marginLeft: '10px',
            width: 'fit-content',
            backgroundColor: '#0096FF',
            color: 'white',
            border: 'none',
          }}
        >
         Completed Appointments
      </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div 
            className="form-container p-4" 
            style={{ backgroundColor: '#e6f7ff', borderRadius: '8px' }} 
          >
            <h1 className="mb-2 text-center" style={{ fontSize: '30px' }}>Book An Appointment</h1>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
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
                </Col>
              </Row>

              <Row>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
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
                </Col>
              </Row>

              <Row>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
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
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fee">
                    <Form.Label>Doctor's Fee</Form.Label>
                    <Form.Control
                      type="text"
                      name="fee"
                      value={formData.fee}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="date"
                      value={formData.date}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="starttime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="starttime"
                      value={formData.starttime}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" block>
                Book Appointment
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Appointment;
