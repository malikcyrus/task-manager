import express, { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

const router = express.Router();

router.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask: ITask = new Task({
      title,
      description,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/tasks/:id', async (req: Request, res: Response) => { 
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    res.sendStatus(201); // No content
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
