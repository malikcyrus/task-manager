import express from 'express';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes'

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
