require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// CORS configuration
const allowedOrigins = [
  'https://workouts-pal.vercel.app/', // <-- replace with your frontend URL
  'http://localhost:3000'             // local dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running successfully 🚀');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 10000;
    app.listen(port, () => {
      console.log(`Connected to DB & Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });
