import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from "react-bootstrap"; // Using Bootstrap's Table and Container components

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <Container fluid className="AdminDashboard"> {/* Ensures fluid layout for the dashboard */} 
      <h1 className="text-center mb-4">All Appointments</h1>
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Hospital Name</th>
            <th>Contact Number</th>
            <th>Fee</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.hospitalName}</td>
                <td>{appointment.contactNumber}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.fee}</td>
                <td>{appointment.date.split('T')[0]}</td> {/* Formatting date to "yyyy-MM-dd" */}
                <td>{appointment.starttime}</td>
                <td>{appointment.status || "Not approved"}</td> {/* Default to "Not approved" if status is undefined */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No appointments found</td> {/* Adjusted colSpan based on number of columns */}
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllAppointments;

