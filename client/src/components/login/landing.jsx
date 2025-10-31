import { useState } from 'react'
import "./landing.css";
import Dashboard from '../dashboard/dashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Login(){

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
    const navigate = useNavigate();

   const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <>
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
    </>
  )
}

export default Login