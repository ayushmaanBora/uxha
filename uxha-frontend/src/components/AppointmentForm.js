import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm() {
  const [patientName, setPatientName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const requestAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/appointments/request', {
        patientId: patientName,
        doctorId,
        requestedSlot: timeSlot,
      });
      console.log('Appointment requested:', response.data);
    } catch (error) {
      console.error('Error requesting appointment:', error);
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={requestAppointment}>
        <label>
          Your Name:
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </label>
        <br />
        <label>
          Doctor ID:
          <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
        </label>
        <br />
        <label>
          Preferred Time Slot:
          <input type="text" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
        </label>
        <br />
        <button type="submit">Request Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
