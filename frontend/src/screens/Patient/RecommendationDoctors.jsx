// src/components/RecommendDoctor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendationDoctors = () => {
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch unique specializations from the server
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/doctor/fetchSpecializations');
        setSpecializations(response.data);
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };

    fetchSpecializations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/api/doctor/recommendDoctors', {
        params: { specialization: selectedSpecialization },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Recommend a Doctor</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="specialization">Select Specialization:</label>
        <select
          id="specialization"
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          <option value="">--Select--</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <button 
          type="submit" 
          style={{
            padding: '10px 15px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Submit
        </button>
      </form>

      {doctors.length > 0 && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Recommended Doctors:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {doctors.map((doctor) => (
              <div 
                key={doctor._id} 
                style={{
                  backgroundColor: '#e6f7ff', // Light blue background color
                  border: '1px solid #ccc', 
                  borderRadius: '8px', 
                  padding: '15px', 
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                  width: '250px', 
                  textAlign: 'left'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{doctor.doctorname}</h3>
                <p style={{ margin: '5px 0' }}><strong>👨‍⚕️ Experience:</strong> {doctor.experience} years</p>
                <p style={{ margin: '5px 0' }}><strong>👨‍⚕️ Hospital:</strong> {doctor.hospitalName}</p>
                {/* Add more details as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationDoctors;
