import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch all appointments on component mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/appointments/getAllAppointments")
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter(appointment => {
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

      <h5 className="text-center mb-4">All Appointments</h5>
      <Table 
        striped 
        bordered 
        hover 
        responsive 
        className="text-center"
        style={{ backgroundColor: '#e6f7ff' }} // Light blue background for the table
      >
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>Doctor Name</th>
            <th>Fee</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.hospitalName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.fee}</td>
                <td>{appointment.date.split('T')[0]}</td> {/* Formatting date to "yyyy-MM-dd" */}
                <td>{appointment.starttime}</td>
                <td>{appointment.status || "Not approved"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No appointments found</td> {/* Adjusted colSpan based on number of columns */}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AllAppointments;
