import React, { useEffect, useState } from 'react';
import TaskManager from './components/TaskManager';
import LoginForm from './components/LoginForm';

const App: React.FC = () => { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => { 
    setIsLoggedIn(true); 
  };

  return (
    <>
      {isLoggedIn ? (
        <TaskManager />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
};

export default App; 