const { Sequelize } = require('sequelize');

// Set up the Sequelize instance
const sequelize = new Sequelize('uxha_db', 'root', 'uxha', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
