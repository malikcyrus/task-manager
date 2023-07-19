import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setLoginForm({
        ...loginForm, 
        [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 
        const response = await axios.post('api/auth/login', loginForm);
        const { token } = response.data; 

        // Store the token 
        localStorage.setItem('token', token);

        // Calling the onLogin callback
        onLogin();
    } catch (error) { 
        console.error('Error loggin in ', error);
        setError('Invalid Credentials!');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={loginForm.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      <Button type="submit" variant="primary" className="mt-4">Login</Button>
    </Form>
  );
}

export default LoginForm; 