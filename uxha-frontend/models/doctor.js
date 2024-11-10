const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Doctor = sequelize.define('Doctor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  availableSlots: { type: DataTypes.JSON }, // Stores available time slots
});

module.exports = Doctor;
