const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Doctor = require('./doctor');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.STRING, allowNull: false },
  requestedSlot: { type: DataTypes.STRING, allowNull: false },
  suggestedSlot: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected', 'Suggested', 'Confirmed', 'Declined'),
    defaultValue: 'Pending',
  },
});

Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = Appointment;
