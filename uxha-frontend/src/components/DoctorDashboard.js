import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleResponse = async (appointmentId, action, suggestedSlot = null) => {
    try {
      const response = await axios.post(`http://localhost:5000/appointments/${appointmentId}/respond`, {
        response: action,
        suggestedSlot,
      });
      console.log('Response sent:', response.data);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: action } : appointment
        )
      );
    } catch (error) {
      console.error('Error responding to appointment:', error);
    }
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p>Patient: {appointment.patientId}</p>
            <p>Time Slot: {appointment.requestedSlot}</p>
            <p>Status: {appointment.status}</p>
            <button onClick={() => handleResponse(appointment.id, 'accept')}>Accept</button>
            <button onClick={() => handleResponse(appointment.id, 'reject')}>Reject</button>
            <button onClick={() => handleResponse(appointment.id, 'suggest', '12:00')}>Suggest 12:00</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
