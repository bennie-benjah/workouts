import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import workoutsRoutes from './routes/workouts.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
  );
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch((err) => console.log(err));
