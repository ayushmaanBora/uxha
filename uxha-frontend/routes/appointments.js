const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const sequelize = require('../db');

// Request an appointment
router.post('/request', async (req, res) => {
  const { patientId, doctorId, requestedSlot } = req.body;
  try {
    const appointment = await Appointment.create({ patientId, doctorId, requestedSlot });
    res.status(201).send(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to request appointment' });
  }
});

// Doctor response to appointment
router.post('/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { response, suggestedSlot } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    if (response === 'accept') {
      appointment.status = 'Accepted';
    } else if (response === 'reject') {
      appointment.status = 'Rejected';
    } else if (response === 'suggest' && suggestedSlot) {
      appointment.status = 'Suggested';
      appointment.suggestedSlot = suggestedSlot;
    }

    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to appointment' });
  }
});

// Patient response to doctor's suggestion
router.post('/:id/patientResponse', async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    if (response === 'accept') {
      appointment.status = 'Confirmed';
    } else if (response === 'reject') {
      appointment.status = 'Declined';
    }

    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to suggested time' });
  }
});

// Find alternate doctors for a given time slot
router.get('/alternates', async (req, res) => {
  const { timeSlot } = req.query;

  try {
    const doctors = await Doctor.findAll({
      where: sequelize.where(sequelize.json('availableSlots'), timeSlot),
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alternate doctors' });
  }
});

module.exports = router;
