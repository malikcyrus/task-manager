import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import TaskList from './components/TaskList';

interface Task {
  _id: string;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !description) {
      setError('Please enter a title and description.');
      return;
    }

    try {
      const response = await axios.post<Task>('/api/tasks', { title, description });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Task Manager</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="row mb-2">
          <div className="col">
            <Form.Control type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="col">
            <Form.Control as="textarea" rows={5} placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
        </div>
        {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
        <Button type="reset" variant="secondary" className="mr-2 float-left" onClick={() => { setTitle(''); setDescription(''); }}>Clear</Button>
        <Button type="submit" variant="primary" className="float-right">Add Task</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td className="text-right">
                <Button variant="danger" onClick={() => handleDeleteTask(task._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
