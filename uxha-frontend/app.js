const express = require('express');
const sequelize = require('./db');  // Import the db connection
const bodyParser = require('body-parser');

// Import routes
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(bodyParser.json());

// Use the routes
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  // Start the server only after syncing is complete
  app.listen(5000, () => console.log('Server started on http://localhost:5000'));
});
