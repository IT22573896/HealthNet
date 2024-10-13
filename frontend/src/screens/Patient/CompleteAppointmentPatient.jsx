// components/CompletedAppointment.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CompleteAppointmentPatient = () => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments/getDeletedAppointmentsPatient');
        setCompletedAppointments(response.data);
      } catch (error) {
        console.error("Error fetching completed appointments:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = completedAppointments.filter(appointment => {
    const hospitalName = appointment.hospitalName ? appointment.hospitalName.toLowerCase() : "";
    const doctorName = appointment.doctorName ? appointment.doctorName.toLowerCase() : "";
    const search = searchTerm.toLowerCase();

    return hospitalName.includes(search) || doctorName.includes(search);
  });

  return (
    
    <div 
    className="AdminDashboard" 
    style={{ 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', // Ensures the background is centered
      width: '100%', // Full width of the page
      minHeight: '100vh', // Full height of the viewport
      margin: '0', // No margin
      padding: '20px' // Optional: control padding
    }}
  >
    <div className="d-flex justify-content-between align-items-center mb-4">
      <Button 
        variant="primary" 
        onClick={() => navigate('/createAppointment')}
      >
        Book An Appointment
      </Button>

      <Button 
        variant="success" 
        onClick={() => navigate('/recommendDoctors')}
        style={{ marginLeft: '10px' }} // Space between buttons
      >
        Doctor Recommendation
      </Button>

      <Button 
        variant="info" 
        onClick={() => navigate('/getDeletedAppointmentsPatient')}
        style={{ marginLeft: '10px' }} // Space between buttons
      >
        Completed Appointments
      </Button>
      
      
      <Form.Control 
        type="text" 
        placeholder="Search by Hospital Name or Doctor Name"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '400px', marginLeft: '10px' }} // Adjust search bar width and add margin
      />
    </div>


      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Completed Appointments</h2> {/* Decreased title size */}

      <Table 
        striped 
        bordered 
        hover 
        className="text-center"
        style={{ backgroundColor: '#e6f7ff' }} // Light blue background for the table
      >
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Hospital Name</th>
            <th>Doctor Name</th>
            <th>Date</th>
           
           
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.hospitalName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date.split('T')[0]}</td>
               
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No completed appointments found</td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
  );
};

export default CompleteAppointmentPatient;
