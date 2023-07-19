import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'localhost//mongodb/task-manager'                                             

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.use('/api/auth', authRoutes)
  app.use('/api/tasks', taskRoutes);

export default app;
