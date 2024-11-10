CREATE DATABASE uxha_db;
USE uxha_db;
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    availableSlots JSON
);
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId VARCHAR(255) NOT NULL,
    doctorId INT,
    requestedSlot VARCHAR(255) NOT NULL,
    suggestedSlot VARCHAR(255),
    status ENUM('Pending', 'Accepted', 'Rejected', 'Suggested', 'Confirmed', 'Declined') DEFAULT 'Pending',
    FOREIGN KEY (doctorId) REFERENCES doctors(id)
);

