/*
  References:

  - React Router Navigation:
    React Router (no date) 'useNavigate()', available at: https://reactrouter.com/en/main/hooks/use-navigate
    Used for implementing programmatic navigation in-between components.

  - React form handling:
    React (no date) 'Handling Forms', available at: https://react.dev/learn/sharing-state-between-components#handling-form-submission 
    Used for preventing default reload on form submission.

  References for Basic React JSX Syntax:

  - Writing Markup with JSX:
    React (no date) 'Writing Markup with JSX', available at: https://react.dev/learn/writing-markup-with-jsx
    Used for understanding the basics of JSX syntax and how to write React components.

  - JavaScript in JSX with Curly Braces:
    React (no date) 'JavaScript in JSX with Curly Braces', available at: https://react.dev/learn/javascript-in-jsx-with-curly-braces 
    Used for embedding JavaScript expressions inside JSX.

  - JSX In Depth:
    React (no date) 'JSX In Depth', available at: https://legacy.reactjs.org/docs/jsx-in-depth.html
    Used for understanding advanced JSX features and best practices.

  - Quick Start (React Learn):
    React (no date) 'Learn React', available at: https://react.dev/learn
    Referred for introduction including JSX examples.
*/

/*
NOTE:- TEST LOGIN CREDENTIALS

ADMIN:
username - admin
password - admin

USER:
username - john@abc.com
password - user
*/

import { useState } from 'react'
import "./landing.css";
import Dashboard from '../dashboard/dashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getMemberByEmail } from "./loginService";

function Login(){

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else if (password === 'user') {
      const email = username;

      getMemberByEmail(email)
      .then((data) => {
        if (!data) {
          console.error("No data returned from API");
          return;
        }
        console.log("Member Data =", JSON.stringify(data, null, 2));
      if (data.length === 1) {
        const member = data[0];
        // Save into Local Storage
        localStorage.setItem("member_id", member.member_id);
        localStorage.setItem("full_name", member.full_name);
        localStorage.setItem("email", member.email);

        // Access from Local Storage
        // const id = localStorage.getItem("member_id");
        
        console.log("session.data :" + member.full_name);

        navigate('/memberdashboard');
      } else {
        alert("Invalid Credentials!")
      }
      });
  } else {
    alert("Invalid Credentials!");
  }
}
  

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