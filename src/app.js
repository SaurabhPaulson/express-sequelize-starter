require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
require('./models/test.model'); // register models before sync
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Creates missing tables and updates existing ones to match the models.
    // Dev only: renaming a column drops the old one (data lost).
    await sequelize.sync({ alter: true });
    console.log('Models synchronized.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

start();
