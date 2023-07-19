import express from 'express';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 5000; 

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
