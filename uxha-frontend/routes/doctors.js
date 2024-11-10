const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Create a new doctor (optional, for adding doctors to the database)
router.post('/', async (req, res) => {
  const { name, availableSlots } = req.body;
  try {
    const doctor = await Doctor.create({ name, availableSlots });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create doctor' });
  }
});

module.exports = router;
