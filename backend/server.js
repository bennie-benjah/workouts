require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('API is running successfully 🚀');
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
